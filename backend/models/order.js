// const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema({
//     shippingInfo: {
//         name: { type: String, required: true },
//         address: { type: String, required: true },
//         city: { type: String, required: true },
//         state: { type: String, required: true },
//         postalCode: { type: String, required: true },
//         country: { type: String, required: true },
//         email: { type: String, required: true },
//         phoneNumber:{type:String,required:true}
//     },
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Ensure this is correct
//     paymentIntentId: { type: String, default: null },
//     total: { type: Number, required: true },
// });

// module.exports = mongoose.model('Order', orderSchema);
// const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema({
//     shippingInfo: {
//         name: { type: String, required: true },
//         address: { type: String, required: true },
//         city: { type: String, required: true },
//         state: { type: String, required: true },
//         postalCode: { type: String, required: true },
//         country: { type: String, required: true },
//         email: { 
//             type: String, 
//             required: true, 
//             match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ // Email validation regex
//         },
//         phoneNumber: { type: String, required: true }
//     },
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     paymentIntentId: { type: String, default: null },
//     total: { type: Number, required: true },
//     orderStatus: { 
//         type: String, 
//         enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'], 
//         default: 'Pending' 
//     },
//     customer: { type: String, required: true },
//     items: [{
//         productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
//         quantity: { type: Number, required: true }
//     }],
//     total: { type: Number, required: true },
//     createdAt: { type: Date, default: Date.now }
// }, { timestamps: true }); // Automatically add createdAt and updatedAt fields

// module.exports = mongoose.model('Order', orderSchema);


// const mongoose = require('mongoose');
    
    
   
// const orderSchema = new mongoose.Schema({
//     userId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     },
//     items: [{
//         productId: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'Product',
//             required: true
//         },
//         quantity: {
//             type: Number,
//             required: true
//         }
//     }],
//     shippingInfo: {
//         name: { type: String, required: true },
//         address: { type: String, required: true },
//         city: { type: String, required: true },
//         state: { type: String, required: true },
//         postalCode: { type: String, required: true },
//         country: { type: String, required: true },
//         email: { type: String, required: true },
//         phoneNumber: { type: String, required: true },
//     },
//     total: {
//         type: Number,
//         required: true
//     },
//     orderId: {
//         type: String,
//         required: true
//     },
//     paymentIntentId: {
//         type: String,
//         required: false // Only if you're using a payment service
//     }
// }, { timestamps: true });

// const Order = mongoose.model('Order', orderSchema);
// module.exports = Order;
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product', // Reference to the Product model
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
    paymentIntentId: String, // For payment tracking (if using services like Stripe)
    orderId: { // Ensure this field is included
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

