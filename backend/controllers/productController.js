const Product = require('../models/Product');

// Get all products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find({}).sort({ createdAt: -1 });
        res.json(products);
    } catch (error) {
        res.status(500);
        throw new Error('Server Error: Could not fetch products');
    }
};

// Create new product
const createProduct = async (req, res) => {
    try {
        const { name, price, description, imageUrl, category } = req.body;
        
        if (!name || !price || !description || !category) {
            res.status(400);
            throw new Error('Please provide all required fields');
        }

        const product = await Product.create({
            name,
            price,
            description,
            imageUrl: imageUrl || 'https://via.placeholder.com/150',
            category
        });
        
        res.status(201).json(product);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
};

// Search products
const searchProducts = async (req, res) => {
    try {
        const { query, category } = req.query;
        let searchQuery = {};

        if (query) {
            searchQuery = {
                $or: [
                    { name: { $regex: query, $options: 'i' } },
                    { description: { $regex: query, $options: 'i' } }
                ]
            };
        }

        if (category) {
            searchQuery.category = category;
        }

        const products = await Product.find(searchQuery).sort({ createdAt: -1 });
        res.json(products);
    } catch (error) {
        res.status(500);
        throw new Error('Server Error: Could not perform search');
    }
};

// Get product by ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            res.status(404);
            throw new Error('Product not found');
        }
        res.json(product);
    } catch (error) {
        res.status(error.kind === 'ObjectId' ? 404 : 500);
        throw new Error(error.message);
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    searchProducts
};
