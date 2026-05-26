const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');

// Import routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/orders');

// INIT APP
const app = express();

// =====================
// DEBUG ENV (IMPORTANT)
// =====================
console.log(" ENV CHECK:");
console.log("MONGODB_URI =", process.env.MONGODB_URI);
console.log("PORT =", process.env.PORT);

// =====================
// CHECK CRITICAL ENV
// =====================
if (!process.env.MONGODB_URI) {
  console.error(" ERROR: MONGODB_URI is missing");
  process.exit(1);
}

// =====================
// CONNECT DB
// =====================
connectDB();

// =====================
// MIDDLEWARE
// =====================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static
app.use('/uploads', express.static('uploads'));
app.use(express.static('frontend'));

// =====================
// ROUTES
// =====================
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// =====================
// FRONTEND FALLBACK
// =====================
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/index.html'));
});

// =====================
// ERROR HANDLER
// =====================
app.use(errorHandler);

// =====================
// START SERVER
// =====================
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});