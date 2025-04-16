
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/OrdersController');

// Routes
router.post('/orders', orderController.addOrder);
router.get('/orders', orderController.getAllOrders);
router.put('/orders/:orderId', orderController.updateOrderStatus);

module.exports = router; // ✅ Must export the router directly
