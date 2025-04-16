// controllers/OrdersController.js

const OrderModel = require('../models/OrderModel');

// Create Order
exports.addOrder = async (req, res) => {
  try {
    const { customer, items, total } = req.body;

    if (!customer || !items || items.length === 0) {
      return res.status(400).json({ message: 'Invalid order data' });
    }

    await OrderModel.create({ customer, items, total });

    console.log("Order received:", { customer, items, total });

    res.status(201).json({ message: 'Order placed successfully' });
  } catch (err) {
    console.error('Order Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Admin: Get All Orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get orders' });
  }
};

// Admin: Update Order Status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const updated = await OrderModel.findByIdAndUpdate(orderId, { status }, { new: true });

    if (!updated) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order status updated', order: updated });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update status' });
  }
};
exports.getSingleProduct = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id)
      .populate('categoryId')
      .populate('subCategoryId');

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Server error' });
  }
};