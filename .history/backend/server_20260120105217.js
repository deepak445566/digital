const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: 'https://digital-cfse.vercel.app',
  credentials: true
}));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/career_portal')
.then(() => console.log('MongoDB Connected Successfully'))
.catch(err => {
  console.log('MongoDB Connection Error:', err.message);
  console.log('Make sure MongoDB is running: mongod');
});

// Import routes
const authRoutes = require('./routes/auth');
const jobRoutes = require('./routes/jobs');
const paymentRoutes = require('./routes/payment'); // Add this line

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/payment', paymentRoutes); // Add this line

// Test route
app.get('/test', (req, res) => {
  res.json({ 
    message: 'Server is running',
    admin_email: process.env.ADMIN_EMAIL ? 'Set' : 'Not set',
    razorpay_key: process.env.RAZORPAY_KEY_ID ? 'Set' : 'Not set'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Test endpoint: http://localhost:${PORT}/test`);
  console.log(`Admin Email from .env: ${process.env.ADMIN_EMAIL}`);
});