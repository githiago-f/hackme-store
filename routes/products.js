import { Router } from 'express';
import { db } from "../infra/db/connection.js";
import { rootLogger } from '../infra/logging/root-logger.js';
import createError from "http-errors";
import { makeUrl } from "../lib/make-url.js";
import { page } from '../lib/page-render.js';

const logger = rootLogger.child();
const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const {sortBy, order, product, page, perPage} = req.query;
    logger.info(req.query);
    logger.info('User loged in: ', req.user);
    const coreQuery = `WHERE deletedAt is null ${
      product ? 'AND `product_name` like(\"%' + product + '%\")' : ''
    }`;
    const query = db.raw(`
        SELECT * FROM products
        ${coreQuery}
        ORDER BY ${sortBy??'product_price'} ${order??'ASC'}
        LIMIT ${perPage??10}
        OFFSET ${(page??0) * (perPage??10)}
    `);
    const data = (await query)[0];
    logger.info(query.toSQL().sql);
    let count = 0;
    try {
      if(data.length > 0) {
        count = (await db.raw(`SELECT count(product_id) FROM products ${coreQuery}`))[0][0]['count(product_id)'];
      }
    } catch(e) {
      logger.error(e);
    }
    res.render('product/products', {
      title: 'Products',
      products: data,
      totalItems: count,
      totalPages: Math.floor(count / (perPage??10)),
      currentPage: parseInt(page??'0'),
      url: makeUrl('/products', req.query),
      user: req.user
    });
  } catch (e) {
    next(e);
  }
});
router.get('/create', page('product/create_product', { title: 'Create project' }));

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  const query = db.raw(`SELECT * FROM products WHERE product_id = ${id} AND deletedAt is null`);
  logger.info(query.toSQL().sql);
  const [product] = (await query)[0];
  if(!product) {
    return next(createError(404));
  }
  logger.info(product);
  res.render('product/index', {
    product,
    title: product.product_name,
    user: req.user
  });
});

router.post('/', async (req, res) => {
  const { name: product_name, price, description } = req.body;
  const [id] = await db.into('products')
    .insert({
      product_name,
      product_price: Number(price),
      description
    })
    .returning('product_id');
  res.redirect(`/products/${id}`);
});

export default router;
