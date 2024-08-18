const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcryptjs');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const bodyParser = require('body-parser');
const Order = require('./models/order');
const orderRoutes = require('./routes/orderRoutes.js');

const auth1 = require('./routes/auth1.js');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
require('dotenv').config();
const jwt = require('jsonwebtoken');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');



const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));


app.use('/orders', orderRoutes);
app.use('/users', userRoutes);
app.use('/api/admins', adminRoutes);


const mongoURI = process.env.MONGODB_URI;
if (!mongoURI) {
    console.error("MongoDB URI is not defined in the environment variables.");
    process.exit(1);
}

mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });
//add products
app.post('/products', upload.single('image'), async (req, res) => {
    
    try {
        const { name, category, description, new_price } = req.body;
        const imageUrl = req.file ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` : '';

        const newProduct = new Product({
            name,
            image: imageUrl,
            category,
            description,
            new_price
        });

        await newProduct.save();
        res.status(201).json({ message: 'Product added successfully', product: newProduct });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ message: 'Error adding product', error: error.message });
    }
});

app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
});

app.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ message: 'Error fetching product', error: error.message });
    }
});

app.delete('/products/:id', async (req, res) => {
    
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully', product: deletedProduct });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
});
//update products
app.put('/products/:id', upload.single('image'), async (req, res) => {
  
    const { id } = req.params;
    const { name, category, description, new_price } = req.body;
    let imageUrl = req.file ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` : undefined;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { 
                name, 
                category, 
                description, 
                new_price, 
                ...(imageUrl && { image: imageUrl }) 
            },
            { new: true } 
        );

        if (!updatedProduct) {
            return res.status(404).send('Product not found');
        }

        res.json(updatedProduct);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Error updating product', error: error.message });
    }
});


app.post('/cart/add', auth1, async (req, res) => {
    const { productId, quantity } = req.body; 
    const userId = req.userId; 

    try {
        let cartItem = await Cart.findOne({ userId });

        if (!cartItem) {
           
            cartItem = new Cart({ userId, items: [] });
        }

        
        const productIndex = cartItem.items.findIndex(item => item.productId.toString() === productId);
        if (productIndex > -1) {
            
            cartItem.items[productIndex].quantity += quantity;
        } else {
           
            cartItem.items.push({ productId, quantity });
        }

        await cartItem.save();
        res.status(201).json(cartItem);
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ message: 'Error adding to cart', error: error.message });
    }
});

// Fetch cart items
app.get('/cart/:userId', async (req, res) => {
    const { userId } = req.params;
    console.log("Fetching cart for userId:", userId);
    
    try {
        const cartItems = await Cart.find({ userId }).populate({
            path: 'items.productId', 
            model: 'Product'
        });
        console.log("Cart items fetched:", cartItems);
        res.status(200).json(cartItems);
    } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).json({ message: 'Error fetching cart items', error: error.message });
    }
});
app.post('/cart/update', async (req, res) => {
    const { id, quantity } = req.body;

    try {
        const cart = await Cart.findOneAndUpdate(
            { 'items._id': id },
            { $set: { 'items.$.quantity': quantity } },
            { new: true }
        );

        if (!cart) return res.status(404).json({ message: 'Cart item not found' });
        res.json(cart);
    } catch (error) {
        console.error('Error updating cart item:', error);
        res.status(500).json({ message: error.message });
    }
});

// Remove Cart Item
app.delete('/cart/remove/:id', async (req, res) => {
    const itemId = req.params.id;

    try {
        const cart = await Cart.findOneAndUpdate(
            { 'items._id': itemId },
            { $pull: { items: { _id: itemId } } },
            { new: true }
        );

        if (!cart) return res.status(404).json({ message: 'Cart item not found' });
        res.json(cart);
    } catch (error) {
        console.error('Error removing cart item:', error);
        res.status(500).json({ message: error.message });
    }
});


//wishlist
const WishlistModel = require('./models/wishlist'); 

app.post('/wishlist', async (req, res) => {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
        return res.status(400).json({ message: "User ID and Product ID are required." });
    }

    try {
        
        const existingItem = await WishlistModel.findOne({ userId, productId });
        if (existingItem) {
            return res.status(409).json({ message: "Product already in wishlist." }); // Conflict status
        }

        
        const wishlistItem = await WishlistModel.create({ userId, productId });
        res.status(201).json(wishlistItem);
    } catch (error) {
        console.error('Error adding to wishlist:', error); // Improved logging
        res.status(500).json({ message: "Failed to add item to wishlist.", error: error.message });
    }
});
app.get('/wishlist/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const wishlistItems = await WishlistModel.find({ userId }).populate('productId');
        res.status(200).json(wishlistItems);
    } catch (error) {
        console.error('Error fetching wishlist:', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.delete('/wishlist/remove/:id', async (req, res) => {
    try {
        const deletedItem = await WishlistModel.findByIdAndDelete(req.params.id);
        if (!deletedItem) {
            return res.status(404).json({ message: 'Wishlist item not found' });
        }
        res.status(200).json({ message: 'Item removed from wishlist', item: deletedItem });
    } catch (error) {
        console.error('Error removing wishlist item:', error);
        res.status(500).json({ message: 'Error removing wishlist item', error: error.message });
    }
});


app.post('/checkout', async (req, res) => {
    const { paymentMethod, amount, shippingInfo, userId } = req.body;

    console.log("Checkout Request: ", req.body);

    try {
        const cartItems = await Cart.find({ userId }).populate({
            path: 'items.productId', 
            model: 'Product'
        });
        console.log("Fetched Cart Items for Checkout: ", cartItems);

        if (cartItems.length === 0) {
            return res.status(400).json({ success: false, error: 'Cart is empty' });
        }

        
        if (paymentMethod === 'cash') {
            let orderItems = cartItems.reduce((acc, cartItem) => {
                cartItem.items.forEach(item => {
                    acc.push({
                        productId: item.productId._id,
                        quantity: item.quantity,
                    });
                });
                return acc;
            }, []);
                
            let newOrder = new Order({
                shippingInfo,
                userId,
                paymentIntentId: null, 
                total: amount / 100,
                orderId: `ORD-${Date.now()}`,
                items: orderItems,
            });

            await newOrder.save();
            console.log("New Order Created: ", newOrder);

            return res.status(200).json({ success: true, orderDetails: newOrder });
        }

        
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
        });

        let orderItems = cartItems.reduce((acc, cartItem) => {
            cartItem.items.forEach(item => {
                acc.push({
                    productId: item.productId._id,
                    quantity: item.quantity,
                });
            });
            return acc;
        }, []);
            
        let newOrder = new Order({
            shippingInfo,
            userId,
            paymentIntentId: paymentIntent.id, 
            total: amount / 100,
            orderId: `ORD-${Date.now()}`,
            items: orderItems,
        });

        await newOrder.save();
        console.log("New Order Created: ", newOrder);

        return res.status(200).json({ success: true, clientSecret: paymentIntent.client_secret, orderDetails: newOrder });
    } catch (error) {
        console.error('Error processing payment or saving order:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
});


let statisticsData = null; 
let topProductsData = null; 
let totalCount=null;

app.post('/dashboard/statistics', (req, res) => {
    statisticsData = req.body; 
    console.log('Received statistics:', statisticsData);
    res.status(200).send({ message: 'Statistics received successfully' });
});



app.post('/dashboard/top-products', (req, res) => {
    topProductsData = req.body; 
    console.log('Received top products:', topProductsData);
    res.status(200).send({ message: 'Top products received successfully' });
});


app.get('/dashboard/statistics', (req, res) => {
   
    if (statisticsData) {
        res.json(statisticsData); 
    } else {
        res.status(404).send({ message: 'No statistics data available' });
    }
});


app.get('/dashboard/top-products', (req, res) => {
   
    if (topProductsData) {
        res.json(topProductsData); 
    } else {
        res.status(404).send({ message: 'No top products data available' });
    }
});
app.post('/dashboard/total-products', (req, res) => {
    totalCount= req.body;
    console.log('Received top products:', totalCount);
    res.status(200).send({ message: 'Top products received successfully' });
});
app.get('/dashboard/total-products', (req, res) => {
   
    if (totalCount) {
        res.json(totalCount); 
    } else {
        res.status(404).send({ message: 'No top products data available' });
    }
});

app.get('/dashboard/data', async (req, res) => {
    try {
        
        const statistics = statisticsData || {};

       
        const topProducts = topProductsData || [];

        
        const totalProductsResponse = totalCount || {};
        
       
       

        
        res.json({
            totalStats: {
                ...statistics,
                 },
            topProducts,
            totalProducts: totalProductsResponse.totalCount || 0
        });
        
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).json({ message: 'Error fetching dashboard data', error: error.message });
    }
});

app.listen(5000, () => {
    console.log(`Server is running on port 5000`);
});
