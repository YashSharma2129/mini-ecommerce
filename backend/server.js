require('dotenv').config();

// Verify environment variables are loaded
if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET is not defined in environment variables');
  process.exit(1);
}

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Add this after connectDB();
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  // Prevent crash, but log the error
  if (process.env.NODE_ENV === 'development') {
    console.error(err.stack);
  }
});

// Middleware
app.use(cors({
    origin: ['https://mini-ecommerce-yash.netlify.app', 'http://localhost:3000'],
    credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes); // Ensure this exactly matches frontend URL

// Error Handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
