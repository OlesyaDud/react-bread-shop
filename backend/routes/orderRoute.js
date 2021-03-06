import express from 'express';
const router = express.Router();
import {addOrderItems, getMyOrders, getOrderById, updateOrderToPaid} from '../controllers/orderController.js';
import {protect} from '../middleware/auth.js';

router.route('/').post(protect, addOrderItems);
router.route('/:id').get(protect, getOrderById);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id/pay').put(protect, updateOrderToPaid);

export default router;