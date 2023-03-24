import { Router } from 'express';
import createError from "http-errors";
import {db} from "../infra/db/connection.js";
import {makeUrl} from "../lib/make-url.js";

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const orders = await db.raw(`
        SELECT 
          o.*,
          u.user_email,
          u.user_name,
          p.product_name,
          p.product_price
        FROM orders o
        LEFT JOIN users u ON u.user_id = o.user_id
        LEFT JOIN products p ON p.product_id = o.product_id
        WHERE u.user_email like("%${req.query.email??''}%")
      `);
    res.render('order/orders', {
      orders: orders[0],
      title: 'Orders',
      user: req.user,
      url: makeUrl('/orders', req.query)
    });
  } catch (e) {
    next(createError(e));
  }
});

export default router;
