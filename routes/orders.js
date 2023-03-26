import { Router } from 'express';
import {ordersController} from "../controllers/orders.controller.js";

const router = Router();

router.get('/', ordersController.index);
router.get('/:id', ordersController.view);

export default router;
