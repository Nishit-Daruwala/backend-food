import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import foodRoutes from './routes/food.js';
import cartRoutes from './routes/cart.js';
import orderRoutes from './routes/order.js';

dotenv.config();
const app = express();

// ======================= CORS CONFIG ========================
app.use(cors({
  origin: "*",   // allow all domains
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// If you want credentials support later add:
// app.use(cors({ origin: true, credentials: true }));

// ============================================================

app.use(express.json());

// ======================= ROUTES =============================
app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
// ============================================================

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`DineDrop Backend running on port ${PORT}`);
});
