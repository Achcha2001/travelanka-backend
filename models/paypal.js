const mongoose = require('mongoose');

// Define the schema for the payment collection
const paymentSchema = new mongoose.Schema({
  cardholderName: String,
  cardNumber: String,
  cvv: String,
  amount: Number,
  orderId: String,
  
  capturedAt: Date,
  createdAt: { type: Date, default: Date.now },
});

// Create the Payment model
const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
