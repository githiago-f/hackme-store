import { Router } from 'express';
import { page } from '../lib/page-render.js';
import {productsController} from "../controllers/products.controller.js";

const router = Router();

router.get('/', productsController.index);
router.get('/create', page('product/create_product', { title: 'Criar produto' }));

router.get('/:id', productsController.view);

router.post('/', productsController.create);

export default router;
