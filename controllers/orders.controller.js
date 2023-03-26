import {db} from "../infra/db/connection.js";
import {makeUrl} from "../lib/make-url.js";
import createError from "http-errors";
import {countOrders, findOrders} from "../data/sql/orders.sql.js";
import {rootLogger} from "../infra/logging/root-logger.js";
import {getCount} from "../lib/get-count.js";

const logger = rootLogger.child(
  { component: 'order-controller' },
  true
);

const index = async (req, res, next) => {
  try {
    const { perPage, page } = req.query;
    const count = await getCount(countOrders(req.query));
    const orders = await db.raw(findOrders(req.query));
    res.render('order/orders', {
      orders: orders[0],
      title: 'Pedidos',
      totalItems: count,
      totalPages: Math.floor(count / (perPage??10)),
      currentPage: parseInt(page??'0'),
      user: req.user,
      url: makeUrl('/orders', req.query)
    });
  } catch (e) {
    next(createError(e));
  }
};

const create = (req, res, next) => {
  logger.info('Creating order');
};

const view = async (req, res, next) => {
  const { id } = req.params;
  logger.info('Viewing order #' + id);
  const [order] = await db('orders').select().limit(1)
    .leftJoin('users', 'users.user_id', 'orders.user_id')
    .leftJoin('products', 'products.product_id', 'orders.product_id')
    .where({ order_id: id });
  if(!order) {
    return next(createError(404));
  }
  res.json(order);
}

export const ordersController = {
  index,
  create,
  view
}
