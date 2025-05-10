const Order = require('../models/Order');

// Create new order
const createOrder = async (req, res) => {
    try {
        const order = await Order.create(req.body);
        res.status(201).json(order);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
};

// Get order by ID
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            res.status(404);
            throw new Error('Order not found');
        }
        res.json(order);
    } catch (error) {
        res.status(error.kind === 'ObjectId' ? 404 : 500);
        throw new Error(error.message);
    }
};

module.exports = {
    createOrder,
    getOrderById
};
