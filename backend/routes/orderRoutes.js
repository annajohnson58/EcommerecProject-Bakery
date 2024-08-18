
// const express = require('express');
// const Order = require('../models/order');
// const router = express.Router();


// // router.get('/orders', async (req, res) => {
// //     try {
// //         const orders = await Order.find();
// //         res.status(200).json(orders);
// //     } catch (error) {
// //         console.error('Error fetching orders:', error);
// //         res.status(500).json({ message: 'Error fetching orders', error: error.message });
// //     }
// // });
// app.get('/order/:orderId', async (req, res) => {
//     const { orderId } = req.params;

//     try {
//         const order = await Order.findById(orderId).populate('items.productId');
//         if (!order) {
//             return res.status(404).json({ success: false, message: 'Order not found' });
//         }
//         res.status(200).json({ success: true, order });
//     } catch (error) {
//         console.error('Error fetching order details:', error);
//         res.status(500).json({ success: false, message: 'Error retrieving order details' });
//     }
// });


// router.post('/orders', async (req, res) => {
//     const { customer, items, total, shippingInfo, paymentIntentId } = req.body;
    
//     try {
//         const newOrder = new Order({
//             customer,
//             items,
//             total,
//             shippingInfo,
//             paymentIntentId
//         });

//         await newOrder.save();
//         res.status(201).json(newOrder);
//     } catch (error) {
//         console.error('Error creating order:', error);
//         res.status(500).json({ message: 'Error creating order', error: error.message });
//     }
// });

// module.exports = router;
// const express = require('express');
// const Order = require('../models/order');
// const router = express.Router();
// const auth = require('./auth');


// // Fetch all orders (Uncomment if needed)
// router.get('/', async (req, res) => {
//     try {
//         const orders = await Order.find().populate('items.productId'); // Populate product details
//         res.status(200).json({ success: true, orders });
//     } catch (error) {
//         console.error('Error fetching orders:', error);
//         res.status(500).json({ success: false, message: 'Error fetching orders', error: error.message });
//     }
// });

// // Fetch a specific order by ID
// router.get('/order/:orderId', auth, async (req, res) => {
//     const { orderId } = req.params;
//     console.log("Fetching order with ID:", orderId); // Log the orderId being fetched

//     try {
//         const order = await Order.findById(orderId).populate('items.productId');
//         if (!order) {
//             console.log(`Order with ID ${orderId} not found`); // Log not found
//             return res.status(404).json({ success: false, message: 'Order not found' });
//         }
//         res.status(200).json({ success: true, order });
//     } catch (error) {
//         console.error('Error fetching order details:', error);
//         res.status(500).json({ success: false, message: 'Internal server error' });
//     }
// });
// // Create a new order
// router.post('/orders', async (req, res) => {
//     const { userId, items, total, shippingInfo, paymentIntentId } = req.body;

//     // Validate incoming data
//     if (!userId || !items || !Array.isArray(items) || items.length === 0 || !total || !shippingInfo) {
//         return res.status(400).json({ success: false, message: 'Please provide all required fields.' });
//     }
    
//     try {
//         const newOrder = new Order({
//             userId,
//             orderId, // Ensure this is the correct field name
//             items,
//             total,
//             shippingInfo,
//             paymentIntentId
//         });

//         await newOrder.save();
//         res.status(201).json({ success: true, order: newOrder });
//     } catch (error) {
//         console.error('Error creating order:', error);
//         res.status(500).json({ success: false, message: 'Error creating order', error: error.message });
//     }
// });
// // In your routes/orders.js file

// router.patch('/:orderId', async (req, res) => {
//     const { orderId } = req.params;
//     const { status } = req.body;
  
//     try {
//       const updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
//       if (!updatedOrder) {
//         return res.status(404).json({ success: false, message: 'Order not found' });
//       }
//       res.status(200).json(updatedOrder);
//     } catch (error) {
//       console.error('Error updating order status:', error);
//       res.status(500).json({ success: false, message: 'Error updating order status', error });
//     }
//   });

// module.exports = router;
const express = require('express');
const Order = require('../models/order'); // Import Order model
const router = express.Router();
const auth1 = require('./auth1');
const jwt = require('jsonwebtoken');

// Middleware to verify token and role
const auth = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        req.isAdmin = decoded.role === 'admin'; // Check if the user is an admin
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

// Get all orders
router.get('/', async (req, res) => {
   
    console.log("Fetching all orders..."); // Log when the route is hit
    try {
        const orders = await Order.find().populate('userId','username email').populate('items.productId');
        console.log("Orders fetched:", orders); // Log the fetched orders
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
});
router.get('/order/:orderId', auth, async (req, res) => {
        const { orderId } = req.params;
        console.log("Fetching order with ID:", orderId); // Log the orderId being fetched
    
        try {
            const order = await Order.findById(orderId).populate('items.productId');
            if (!order) {
                console.log(`Order with ID ${orderId} not found`); // Log not found
                return res.status(404).json({ success: false, message: 'Order not found' });
            }
            res.status(200).json({ success: true, order });
        } catch (error) {
            console.error('Error fetching order details:', error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    });

// Update order status

// Update order status
// router.put('/:id', async (req, res) => {
//     const { status } = req.body; // Expecting status in request body
//     try {
//         const order = await Order.findByIdAndUpdate(req.params.id, { orderStatus: status }, { new: true })
//             .populate('items.productId'); // Populate items to include product details
//         if (!order) {
//             return res.status(404).json({ message: 'Order not found' });
//         }
//         res.status(200).json(order); // Return the updated order with populated items
//     } catch (error) {
//         console.error('Error updating order status:', error);
//         res.status(500).json({ message: 'Error updating order status', error: error.message });
//     }
// });
// Update order status
router.put('/:id', async (req, res) => {
    const { status } = req.body; // Expecting status in request body
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, { orderStatus: status }, { new: true })
            .populate('userId', 'username email') // Populate userId to include user details
            .populate('items.productId'); // Populate items to include product details
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order); // Return the updated order with populated fields
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ message: 'Error updating order status', error: error.message });
    }
});

// Delete an order
router.delete('/:id', async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json({ message: 'Order deleted successfully', order });
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ message: 'Error deleting order', error: error.message });
    }
});

module.exports = router;