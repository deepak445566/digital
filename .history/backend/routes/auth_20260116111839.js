const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// Admin login
router.post('/login', async (req, res) => {
  try {
    console.log('Login attempt for:', req.body.email);
    
    const { email, password } = req.body;

    // Get credentials from .env
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    console.log('Expected:', adminEmail, adminPassword);
    console.log('Received:', email, password);

    // Check if credentials match .env values
    if (email === adminEmail && password === adminPassword) {
      console.log('Credentials matched with .env');
      
      try {
        // Check if admin exists in DB, if not create one
        let admin = await Admin.findOne({ email });
        
        if (!admin) {
          console.log('Creating new admin in database');
          admin = new Admin({ 
            email, 
            password: password // Password will be hashed by pre-save hook
          });
          await admin.save();
          console.log('New admin created:', admin.email);
        } else {
          console.log('Admin found in DB:', admin.email);
        }

        // Create token
        const token = jwt.sign(
          { id: admin._id, email: admin.email },
          process.env.JWT_SECRET || 'fallback_secret_key',
          { expiresIn: '24h' }
        );

        console.log('Token generated successfully');
        
        res.json({
          success: true,
          message: 'Login successful',
          token,
          admin: {
            id: admin._id,
            email: admin.email,
          },
        });
      } catch (dbError) {
        console.error('Database error:', dbError);
        res.status(500).json({
          success: false,
          message: 'Database error: ' + dbError.message
        });
      }
    } else {
      console.log('Invalid credentials');
      res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }
  } catch (error) {
    console.error('Login process error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Verify token
router.post('/verify', (req, res) => {
  try {
    const token = req.header('x-auth-token');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token, authorization denied',
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key');
    res.json({
      success: true,
      admin: decoded,
    });
  } catch (error) {
    console.error('Token verification error:', error.message);
    res.status(401).json({
      success: false,
      message: 'Token is not valid',
    });
  }
});

module.exports = router;