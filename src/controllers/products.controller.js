import {db} from "../infra/db/connection.js";
import {countAllProducts, findAllProducts} from "../infra/db/sql/products.sql.js";
import {getCount} from "../lib/get-count.js";
import {makeUrl} from "../lib/make-url.js";
import createError from "http-errors";
import {rootLogger} from "../infra/logging/root-logger.js";

const logger = rootLogger.child(
  { component: 'products-controller' },
  true
);

const index = async (req, res, next) => {
  try {
    const {page, perPage} = req.query;
    const data = (await db.raw(findAllProducts(req.query)))[0];
    const count = await getCount(countAllProducts(req.query));

    res.render('product/products', {
      title: 'Produtos',
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
};

const view = async (req, res, next) => {
  const { id } = req.params;
  const [product] = await db('products').select().limit(1)
    .where( {
      product_id: id,
      deletedAt: null
    });
  if(!product) {
    return next(createError(404));
  }
  let cards;
  if(req.user && req.user.length > 0) {
    cards = await db('card_data').select().where({ user_id: req.user[0].user_id });
  }
  res.render('product/index', {
    product,
    title: product.product_name,
    user: req.user,
    cards
  });
};

const create = async (req, res) => {
  logger.info('Creating product', {
    product_name: req.body.product_name
  });
  const [id] = await db.into('products')
    .insert(req.body)
    .returning('product_id');
  logger.info(`Product with id #${id} created`);
  res.redirect(`/products/${id}`);
};

export const productsController = {
  index,
  view,
  create
};
