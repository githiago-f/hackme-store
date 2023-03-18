import { Router } from 'express';
import { db } from "../infra/db/connection.js";
import { rootLogger } from '../infra/logging/root-logger.js';
import createError from "http-errors";
import {makeUrl} from "../lib/make-url.js";

const logger = rootLogger.child();
const router = Router();
const page = (view, data) =>
  (req, res) => res.render(view, data);

router.get('/', async (req, res, next) => {
  try {
    const {sortBy, order, product, page, perPage} = req.query;
    logger.info(req.query);
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
    const count = (await db.raw(`SELECT count(product_id) FROM products ${coreQuery}`))[0][0]['count(product_id)'];
    logger.info(query.toSQL().sql);
    const data = (await query)[0];
    res.render('products', {
      title: 'Products',
      sales: data,
      totalItems: count,
      totalPages: (count / (perPage??10)) ?? 1,
      currentPage: parseInt(page??'0'),
      url: makeUrl('/products', req.query)
    });
  } catch (e) {
    next(e);
  }
});
router.get('/create', page('create_product', { title: 'Create project' }));

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  const query = db.raw(`SELECT * FROM products WHERE product_id = ${id} AND deletedAt is null`);
  logger.info(query.toSQL().sql);
  const [product] = (await query)[0];
  if(!product) {
    return next(createError(404));
  }
  logger.info(product);
  res.render('product', { product, title: product.product_name });
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
