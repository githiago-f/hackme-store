import { Router } from 'express';
import { db } from "../infra/db/connection.js";
import { rootLogger } from '../infra/logging/root-logger.js';

const logger = rootLogger.child();
const router = Router();

const render = (view, title) =>
  (req, res) => res.render(view, { title });

router.get('/', async (req, res, next) => {
  try {
    const {sortBy, order, product, page, perPage} = req.query;
    logger.info(req.query);
    const query = db.raw(`
        SELECT * FROM products WHERE deletedAt is null
        ${product ? 'AND `product_name` like(\"%' + product + '%\")' : ''}
        ORDER BY ${sortBy??'product_price'} ${order??'ASC'}
        LIMIT ${perPage??10}
        OFFSET ${(page??0) * (perPage??10)}
    `);
    logger.info(query.toSQL().sql);
    const data = (await query)[0];
    res.render('products', {
      title: 'Products',
      sales: data
    });
  } catch (e) {
    next(e);
  }
});

router.get('/create', render('create_product', 'Create project'));

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  const query = db.raw(`SELECT * FROM products WHERE product_id = ${id} AND deletedAt is null`);
  logger.info(query.toSQL().sql);
  const [product] = (await query)[0];
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
  res.redirect('/products/' + id);
});

export default router;
