const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { protect, optionalAuth } = require('../middleware/authMiddleware');

router.route('/')
  .post(optionalAuth, orderController.createOrder);

router.route('/:id')
  .get(optionalAuth, orderController.getOrderById);

module.exports = router;
