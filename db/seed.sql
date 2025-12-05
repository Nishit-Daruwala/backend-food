-- backend/db/seed.sql
-- Run this once in MySQL / phpMyAdmin / VS Code SQLTools

CREATE DATABASE IF NOT EXISTS dinedrop_db;
USE dinedrop_db;

-- 1. Users Table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  mobile_no VARCHAR(15) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Foods Table
CREATE TABLE foods (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT NOT NULL,
  category VARCHAR(50) NOT NULL
);

-- 3. Cart Items (depends on users & foods)
CREATE TABLE cart_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  food_id INT NOT NULL,
  quantity INT DEFAULT 1,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (food_id) REFERENCES foods(id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_food (user_id, food_id)
);

-- 4. Orders Table
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  payment_method VARCHAR(20) NOT NULL,
  status VARCHAR(20) DEFAULT 'Pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 5. Order Items Table
CREATE TABLE order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  food_id INT NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (food_id) REFERENCES foods(id)
);

-- 6. Insert 20 Food Items (real working images)
INSERT INTO foods (name, price, image_url, category) VALUES
('Margherita Pizza', 349.00, 'https://images.unsplash.com/photo-1605478371310-9b2e5f4f9c81?w=600', 'Pizza'),
('Pepperoni Pizza', 449.00, 'https://images.unsplash.com/photo-1628840042765-356cda9d14bc?w=600', 'Pizza'),
('Cheese Burst Pizza', 499.00, 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600', 'Pizza'),
('Veggie Supreme Pizza', 399.00, 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=600', 'Pizza'),

('Classic Cheeseburger', 249.00, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600', 'Burger'),
('Crispy Chicken Burger', 299.00, 'https://images.unsplash.com/photo-1571091718767-18b5b1457c9e?w=600', 'Burger'),
('Double Patty Burger', 379.00, 'https://images.unsplash.com/photo-1598182198870-c90a91e62f16?w=600', 'Burger'),

('Pasta Alfredo', 329.00, 'https://images.unsplash.com/photo-1621996346565-e3dbc44ae2c5?w=600', 'Pasta'),
('Spicy Arrabiata Pasta', 349.00, 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=600', 'Pasta'),
('Paneer Butter Masala', 319.00, 'https://images.unsplash.com/photo-1631451095765-4d5c2f0c9c0b?w=600', 'Indian'),

('Butter Chicken', 399.00, 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600', 'Indian'),
('Chicken Biryani', 429.00, 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600', 'Indian'),
('Veg Fried Rice', 229.00, 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600', 'Chinese'),

('Hakka Noodles', 249.00, 'https://images.unsplash.com/photo-1626074353765-517a681e40be?w=600', 'Chinese'),
('Chilli Paneer Dry', 289.00, 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600', 'Chinese'),
('French Fries', 149.00, 'https://images.unsplash.com/photo-1573080496269-8b0c5d1d8c0a?w=600', 'Snacks'),

('Garlic Bread', 179.00, 'https://images.unsplash.com/photo-1572695157366-5e585ab1b69f?w=600', 'Snacks'),
('Chocolate Brownie', 199.00, 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600', 'Dessert'),
('Vanilla Ice Cream', 169.00, 'https://images.unsplash.com/photo-1576506294767-9e9e11584a62?w=600', 'Dessert'),
('Cold Coffee', 189.00, 'https://images.unsplash.com/photo-1495471549457-1ab80f3d5c24?w=600', 'Beverage');