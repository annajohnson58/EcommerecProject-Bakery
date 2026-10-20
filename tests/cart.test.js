const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');
const Cart = require('../backend/models/cart');
const Product = require('../backend/models/product');
const auth1 = require('../backend/routes/auth1');
const { connectDB, closeDB, clearDB } = require('./setup');

process.env.JWT_SECRET = 'testsecretkey';

const app = express();
app.use(express.json());

// Cart routes setup
app.post('/cart/add', auth1, async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ userId: req.userId });
    if (!cart) {
      cart = new Cart({ userId: req.userId, items: [] });
    }
    const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }
    await cart.save();
    res.status(200).json({ success: true, cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

beforeAll(async () => await connectDB());
afterEach(async () => await clearDB());
afterAll(async () => await closeDB());

describe('Cart API Endpoints', () => {
  let token, userId, product;

  beforeEach(async () => {
    userId = '507f1f77bcf86cd799439011';
    token = jwt.sign({ userId }, process.env.JWT_SECRET);

    product = await Product.create({
      name: 'Sourdough Bread',
      image: 'bread.jpg',
      category: 'Bread',
      description: 'Freshly baked sourdough',
      new_price: 6,
    });
  });

  it('POST /cart/add should add an item to the user cart', async () => {
    const res = await request(app)
      .post('/cart/add')
      .set('Authorization', `Bearer ${token}`)
      .send({ productId: product._id, quantity: 2 });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.cart.items).toHaveLength(1);
    expect(res.body.cart.items[0].quantity).toBe(2);
  });

  it('POST /cart/add should reject requests without token', async () => {
    const res = await request(app)
      .post('/cart/add')
      .send({ productId: product._id, quantity: 1 });

    expect(res.statusCode).toBe(401);
  });
});