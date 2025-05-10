const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true,
        maxLength: [100, 'Product name cannot exceed 100 characters']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
        maxLength: [1000, 'Description cannot exceed 1000 characters']
    },
    imageUrl: {
        type: String,
        default: 'https://via.placeholder.com/150'
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: ['electronics', 'furniture', 'clothing', 'books', 'other']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
