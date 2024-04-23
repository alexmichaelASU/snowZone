const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    theme: {
        type: String,
        
        trim: true,
    },
    name: {
        type: String,
        
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
       
        trim: true,
    },
    manufacturer: {
        type: String,
        
        trim: true,
    },
    size: {
        type: String,
        
        trim: true,
    },
    color: {
        type: String,
        
        trim: true,
    },
    productImage: {
        type: String,
        
    },    

});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;