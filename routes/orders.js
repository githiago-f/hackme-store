import { Router } from 'express';
import createError from "http-errors";
import {db} from "../infra/db/connection.js";

const router = Router();

router.get('/', async (req, res, next) => {
  try {
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
      .orderBy('product_price');
    res.render('order/orders', {
      orders
    });
  } catch (e) {
    next(createError(e));
  }
});

export default router;
