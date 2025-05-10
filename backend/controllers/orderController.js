const Order = require('../models/orderModel');

// Create new order
exports.createOrder = async (req, res) => {
  try {
    const orderData = {
      ...req.body,
      userId: req.user?._id || null,
      isGuestOrder: !req.user
    };

    const order = await Order.create(orderData);
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (req.user?._id && order.userId && order.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
