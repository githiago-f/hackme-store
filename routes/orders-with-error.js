import { Router } from 'express';
import createError from "http-errors";
import {db} from "../infra/db/connection.js";
import { rootLogger } from "../infra/logging/root-logger.js";
import {makeUrl} from "../lib/make-url.js";

const logger = rootLogger.child();
const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const page = req.query.page??'0';
    const perPage = req.query.perPage??'12';
    const count = db('orders')
      .leftJoin('users', 'orders.user_id', 'users.user_id')
      .count();
    count
      .then(i => i[0]['count(*)'])
      .catch(e => {
        logger.error(e);
        return 0;
      });
    logger.info(count.toSQL().sql);
    const orders = await db('orders')
      .select(
        'orders.*',
        'users.user_email',
        'users.user_name',
        'products.product_name',
        'products.product_price'
      )
      .leftJoin('users', 'orders.user_id', 'users.user_id')
      .leftJoin('products', 'orders.product_id', 'products.product_id')
      .whereLike('users.user_email', '%'+(req.query.email??'')+'%')
      .orderBy(
        req.query.sortBy??'orders.createdAt',
        req.query.order??'asc'
      )
      .offset(page * perPage)
      .limit(perPage);
    res.render('order/orders', {
      orders,
      title: 'Orders',
      currentPage: page,
      totalItems: count,
      totalPages: Math.floor(count / perPage),
      user: req.user,
      url: makeUrl('/orders', req.query)
    });
  } catch (e) {
    next(createError(e));
  }
});

export default router;
