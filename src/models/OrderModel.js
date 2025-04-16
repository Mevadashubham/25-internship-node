// src/models/Order.js
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  customer: {
    name: String,
    email: String,
    address: String,
  },
  items: [
    {
      id: String,
      name: String,
      price: Number,
      offerPrice: Number,
      quantity: Number,
      productImageURL: String,
    }
  ],
  total: Number,
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered'],
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', OrderSchema);
