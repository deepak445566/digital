const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

console.log('Admin Login Credentials from .env:');
console.log('Email:', process.env.ADMIN_EMAIL);
console.log('Password:', process.env.ADMIN_PASSWORD);

// Admin login
router.post('/login', async (req, res) => {
  try {
    console.log('Login attempt:', req.body);
    
    const { email, password } = req.body;

    // Check if credentials match .env values
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      console.log('Credentials matched');
      
      // Check if admin exists in DB, if not create one
      let admin = await Admin.findOne({ email });
      
      if (!admin) {
        console.log('Creating new admin in database');
        admin = new Admin({ email, password });
        await admin.save();
      }

      // Create token
      const token = jwt.sign(
        { id: admin._id, email: admin.email },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      console.log('Login successful for:', email);
      
      res.json({
        success: true,
        message: 'Login successful',
        token,
        admin: {
          id: admin._id,
          email: admin.email,
        },
      });
    } else {
      console.log('Invalid credentials');
      console.log('Expected:', process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD);
      console.log('Received:', email, password);
      
      res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error: ' + error.message,
      error: error.stack
    });
  }
});

// Verify token
router.post('/verify', async (req, res) => {
  try {
    const token = req.header('x-auth-token');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token, authorization denied',
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({
      success: true,
      admin: decoded,
    });
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({
      success: false,
      message: 'Token is not valid',
    });
  }
});

module.exports = router;