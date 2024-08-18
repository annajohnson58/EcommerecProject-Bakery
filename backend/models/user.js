// // models/User.js
// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//     username: {
//         type: String,
//         required: true,
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     password: {
//         type: String,
//         required: true,
//     },
//     blocked: {
//         type: Boolean,
//         default: false,
//     },
//     role: {
//         type: String,
//         enum: ['user'],
//         default: 'user',
//     },
//     loginCount: { type: Number, default: 0 },
//     wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
// }, { timestamps: true });
// const User = mongoose.model('User', userSchema);
// module.exports = User;

//     const mongoose = require('mongoose');
//     const userSchema = new mongoose.Schema({
//     username: {
//         type: String,
//         required: true,
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     password: {
//         type: String,
//         required: true,
//     },
//     blocked: {
//         type: Boolean,
//         default: false,
//     },
//     role: {
//         type: String,
//         enum: ['user','admin'], // Updated to include admin
//         default: 'user',
//     },
//     loginCount: { 
//         type: Number, 
//         default: 0 
//     },
//     wishlist: [{ 
//         type: mongoose.Schema.Types.ObjectId, 
//         ref: 'Product' 
//     }],
//     address: {
//         type: String,
//         default: ''
//     },
//     profilePicture: {
//         type: String,
//         default: '' // URL of the profile picture
//     },
//     isVerified: {
//         type: Boolean,
//         default: false // Indicates if the user has verified their email
//     }
// }, { timestamps: true });
// const User = mongoose.model('User', userSchema);
// module.exports = User;
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    blocked: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        enum: ['user', 'admin'], // Include both roles
        default: 'user',
    },
    totalRegistrations: { 
        type: Number, 
        default: 0 
    },
    wishlist: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product' 
    }]
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;