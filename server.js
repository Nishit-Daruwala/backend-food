import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import foodRoutes from './routes/food.js';
import cartRoutes from './routes/cart.js';
import orderRoutes from './routes/order.js';

dotenv.config();
const app = express();

app.use(cors({
    origin: ["https://your-netlify-domain.netlify.app"],  // <-- add your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`DineDrop Backend running on http://localhost:${PORT}`);
});
