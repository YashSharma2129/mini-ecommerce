const express = require('express');
const router = express.Router();
const {
    getProducts,
    getProductById,
    createProduct,
    searchProducts
} = require('../controllers/productController');

// Route handlers
router.route('/').get(getProducts).post(createProduct);
router.route('/search').get(searchProducts);
router.route('/:id').get(getProductById);

module.exports = router;
