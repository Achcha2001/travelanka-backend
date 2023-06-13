const express = require('express');
const router = express.Router();
const Payment = require('../models/paypal');

// Route to create a new payment
router.post('/add', async (req, res) => {
  const { amount, name, cardNumber, cvv } = req.body;

  try {
    // Create a new Payment document
    const payment = new Payment({
      cardholderName: name,
      cardNumber: cardNumber,
      cvv: cvv,
      amount: amount,
      
    });

    // Save the payment document to MongoDB
    await payment.save();

    res.status(201).json({ message: 'Payment created successfully', payment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create payment' });
  }
});

// Route to capture a payment
router.put('/payment/:orderId', async (req, res) => {
  const { orderId } = req.params;

  try {
    // Update the Payment document in MongoDB
    const payment = await Payment.findOneAndUpdate(
      { orderId: orderId },
      { captured: true, capturedAt: new Date() },
      { new: true }
    );

    res.json({ message: 'Payment captured successfully', payment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to capture payment' });
  }
});

module.exports = router;
