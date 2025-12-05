import { db } from '../config/db.js';

export const createOrder = async (req, res) => {
  const { payment_method } = req.body;

  try {    
    const [cartItems] = await db.query(`
      SELECT c.food_id, c.quantity, f.price
      FROM cart_items c
      JOIN foods f ON c.food_id = f.id
      WHERE c.user_id = ?
    `, [req.user.id]);

    if (cartItems.length === 0){ 
        return res.status(400).json({ message: 'Cart is empty' });
    }

    const total_price = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    const [orderResult] = await db.query(
      'INSERT INTO orders (user_id, total_price, payment_method) VALUES (?, ?, ?)',
      [req.user.id, total_price, payment_method]
    );

    const orderId = orderResult.insertId;
    
    const orderItems = cartItems.map(item => [orderId, item.food_id, item.quantity, item.price]);
    await db.query(
      'INSERT INTO order_items (order_id, food_id, quantity, price) VALUES ?',
      [orderItems]
    );
    
    await db.query('DELETE FROM cart_items WHERE user_id = ?', [req.user.id]);

    res.json({ message: 'Order placed successfully!', orderId, total_price });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// backend/controllers/orderController.js

export const getUserOrders = async (req, res) => {
  try {
    const [orders] = await db.query(`
      SELECT 
        o.id, o.total_price, o.payment_method, o.status, o.created_at
      FROM orders o
      WHERE o.user_id = ?
      ORDER BY o.created_at DESC
    -- newest first
    `, [req.user.id]);

    // For each order, get items
    for (let order of orders) {
      const [items] = await db.query(`
        SELECT 
          oi.quantity, oi.price,
          f.name, f.image_url
        FROM order_items oi
        JOIN foods f ON oi.food_id = f.id
        WHERE oi.order_id = ?
      `, [order.id]);

      order.items = items;
    }

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};