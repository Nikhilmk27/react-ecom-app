const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const express = require('express');
const router = require("express").Router();
const Order = require("../models/Order")
const Razorpay = require('razorpay');

const razorpay = new Razorpay({
  key_id: 'rzp_test_b8r9QYFtn70jSl',
key_secret: 'PqaaUuPb2G5Zk9Ee33HTcZf5'
});

router.post('/createOrder', async (req, res) => {
  const { userId, products, amount,address } = req.body;

  try {
    // Create a new order in your database
    const order = new Order({
      userId,
      products,
      amount,
      address
    });

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: amount * 100, // amount in the smallest currency unit
      currency: 'INR',
      receipt: order._id.toString()
    });

    // Save the Razorpay order ID in your order
    order.razorpayOrderId = razorpayOrder.id;
    await order.save();

    res.json(razorpayOrder);
  } catch (error) {
    console.error('Detailed error creating order:', error);
    res.status(500).json({
      message: 'Error creating order',
      error: error.message,
      stack: error.stack
    });
  }
});

router.post('/verify-payment', async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const order = await Order.findOne({ razorpayOrderId: razorpay_order_id });

  if (!order) {
    return res.status(404).send('Order not found');
  }

  const crypto = require('crypto');
  const hmac = crypto.createHmac('sha256', 'PqaaUuPb2G5Zk9Ee33HTcZf5');
  hmac.update(razorpay_order_id + '|' + razorpay_payment_id);
  const generated_signature = hmac.digest('hex');

  if (generated_signature === razorpay_signature) {
    order.razorpayPaymentId = razorpay_payment_id;
    order.razorpaySignature = razorpay_signature;
    order.status = 'paid';
    await order.save();

    res.json({ status: 'success' });
  } else {
    order.status = 'failed';
    await order.save();
    res.json({ status: 'failure' });
  }
});

module.exports = router;
