const Product = require('../models/Product');

// Get all products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find({}).sort({ createdAt: -1 });
        res.json({
            status: 'success',
            data: products
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Server Error: Could not fetch products'
        });
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
        const { query, category, minPrice, maxPrice, sort } = req.query;
        let searchQuery = {};
        
        // Advanced search criteria
        if (query) {
            searchQuery.$or = [
                { name: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
                { category: { $regex: query, $options: 'i' } }
            ];
        }

        if (category) {
            searchQuery.category = category;
        }

        // Price range filter
        if (minPrice || maxPrice) {
            searchQuery.price = {};
            if (minPrice) searchQuery.price.$gte = Number(minPrice);
            if (maxPrice) searchQuery.price.$lte = Number(maxPrice);
        }

        // Dynamic sorting
        let sortOptions = {};
        if (sort) {
            switch (sort) {
                case 'price_asc':
                    sortOptions.price = 1;
                    break;
                case 'price_desc':
                    sortOptions.price = -1;
                    break;
                case 'newest':
                    sortOptions.createdAt = -1;
                    break;
                default:
                    sortOptions.createdAt = -1;
            }
        }

        const products = await Product.find(searchQuery)
            .sort(sortOptions)
            .limit(req.query.limit ? Number(req.query.limit) : 50);

        // Add metadata to response
        res.json({
            status: 'success',
            count: products.length,
            data: products
        });
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error performing search',
            detail: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Get product by ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                status: 'error',
                message: 'Product not found'
            });
        }
        res.json({
            status: 'success',
            data: product
        });
    } catch (error) {
        res.status(error.kind === 'ObjectId' ? 404 : 500).json({
            status: 'error',
            message: error.message
        });
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    searchProducts
};
