const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    theme: {
        type: String,
        required: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    condition: {
        type: String,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        trim: true,
    },
    manufacturer: {
        type: String,
        required: true,
        trim: true,
    },
    size: {
        type: String,
        required: true,
        trim: true,
    },
    color: {
        type: String,
        required: true,
        trim: true,
    },

});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;