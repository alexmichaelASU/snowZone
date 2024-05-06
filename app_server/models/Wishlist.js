const mongoose = require('mongoose');

const wishSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
    },
    _productId: {
        type: mongoose.Types.ObjectId,
        required: true
    }
});

const Wishlist = mongoose.model('Wishlist', wishSchema);

module.exports = Wishlist;