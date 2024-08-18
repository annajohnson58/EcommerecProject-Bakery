const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    // Additional fields can be added here
});

const WishlistModel = mongoose.model('Wishlist', wishlistSchema);

module.exports = WishlistModel;
