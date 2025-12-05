// backend/routes/order.js
import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { createOrder, getUserOrders } from '../controllers/orderController.js';

const router = express.Router();

router.use(authenticateToken);  // All protected

router.post('/', createOrder);
router.get('/', getUserOrders); // ← NEW: Get all orders of user

export default router;