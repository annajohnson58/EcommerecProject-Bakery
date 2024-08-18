

const express = require('express');
const Order = require('../models/order'); 
const router = express.Router();
const auth1 = require('./auth1');
const jwt = require('jsonwebtoken');


const auth = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        req.isAdmin = decoded.role === 'admin'; 
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

// Get all orders
router.get('/', async (req, res) => {
   
    console.log("Fetching all orders..."); 
    try {
        const orders = await Order.find().populate('userId','username email').populate('items.productId');
        console.log("Orders fetched:", orders);
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
});
router.get('/order/:orderId', auth, async (req, res) => {
        const { orderId } = req.params;
        console.log("Fetching order with ID:", orderId); 
    
        try {
            const order = await Order.findById(orderId).populate('items.productId');
            if (!order) {
                console.log(`Order with ID ${orderId} not found`); 
                return res.status(404).json({ success: false, message: 'Order not found' });
            }
            res.status(200).json({ success: true, order });
        } catch (error) {
            console.error('Error fetching order details:', error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    });


router.put('/:id', async (req, res) => {
    const { status } = req.body;
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, { orderStatus: status }, { new: true })
            .populate('userId', 'username email') 
            .populate('items.productId'); 
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order); 
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
