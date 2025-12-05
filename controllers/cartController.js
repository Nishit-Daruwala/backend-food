import { db } from '../config/db.js';

export const getCart = async (req, res) => {
    try {
        const [items] = await db.query(`
            SELECT c.id, c.food_id, c.quantity, f.name, f.price, f.image_url
            FROM cart_items c
            JOIN foods f ON c.food_id = f.id
            WHERE c.user_id = ?`, [req.user.id]);

        res.json(items);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export const addToCart = async (req, res) => {
    const { food_id, quantity = 1 } = req.body;

    try {
        await db.query(`
      INSERT INTO cart_items (user_id, food_id, quantity)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE quantity = quantity + ?
    `, [req.user.id, food_id, quantity, quantity]);

        res.json({ message: 'Added to cart' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

export const updateQuantity = async (req, res) => {
  const { quantity } = req.body;
  const cartItemId = req.params.id;

  if (quantity <= 0) {
    await db.query('DELETE FROM cart_items WHERE id = ? AND user_id = ?', [cartItemId, req.user.id]);
    return res.json({ message: 'Item removed' });
  }

  await db.query('UPDATE cart_items SET quantity = ? WHERE id = ? AND user_id = ?', [quantity, cartItemId, req.user.id]);
  res.json({ message: 'Quantity updated' });
};

export const removeFromCart = async (req, res) => {
  await db.query('DELETE FROM cart_items WHERE id = ? AND user_id = ?', [req.params.id, req.user.id]);
  res.json({ message: 'Item removed' });
};

export const clearCart = async (req, res) => {
  await db.query('DELETE FROM cart_items WHERE user_id = ?', [req.user.id]);
  res.json({ message: 'Cart cleared' });
};