
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    },
    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product', 
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
    }],
    total: {
        type: Number,
        required: true,
    },
    shippingInfo: {
        name: { type: String, required: true },
        address: String,
        city: String,
        postalCode: String,
        country: String,
        phoneNumber: { type: String, required: true },
    },
    total: Number,
    paymentIntentId: String, 
    orderId: { 
        type: String,
        required: true,
    },
    orderStatus: {
        type: String,
        enum: ['pending', 'shipped', 'delivered', 'cancelled'],
        default: 'pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Order = mongoose.model('Order', orderSchema);
 module.exports = Order;

