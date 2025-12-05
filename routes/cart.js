import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { getCart, addToCart, updateQuantity, removeFromCart, clearCart } from '../controllers/cartController.js';

const router = express.Router();

router.use(authenticateToken);

router.get('/', getCart);
router.post('/add', addToCart);
router.put('/:id', updateQuantity);
router.delete('/:id', removeFromCart);
router.delete('/clear/all', clearCart);

export default router;