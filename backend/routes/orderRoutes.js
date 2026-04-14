import express from 'express';
import auth from '../middleware/auth.js';
import { createOrder, getMyOrders, getOrderById } from '../controllers/orderController.js';

const router = express.Router();

router.post('/', auth, createOrder);
router.get('/myorders', auth, getMyOrders);
router.get('/:id', auth, getOrderById);

export default router;
