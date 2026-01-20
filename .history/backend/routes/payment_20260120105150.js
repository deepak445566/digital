// routes/payment.js
const express = require('express');
const router = express.Router();
const { createOrder, verifyPayment } = require('../utils/razorpay');

// Create Razorpay order
router.post('/create-order', async (req, res) => {
  try {
    const { amount, currency = 'INR' } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Valid amount is required',
      });
    }

    const order = await createOrder(amount, currency);

    res.status(200).json({
      success: true,
      order,
      razorpayKey: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create payment order',
      error: error.message,
    });
  }
});

// Verify payment
router.post('/verify', async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: 'Payment details are required',
      });
    }

    const isValid = verifyPayment(razorpay_order_id, razorpay_payment_id, razorpay_signature);

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: 'Payment verification failed',
      });
    }

    // Here you can save payment details to database
    // For example, create a Payment model and save the details

    res.status(200).json({
      success: true,
      message: 'Payment verified successfully',
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
    });
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to verify payment',
      error: error.message,
    });
  }
});

module.exports = router;