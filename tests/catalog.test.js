const request = require('supertest');
const mongoose = require('mongoose');
const express = require('express');
const Product = require('../backend/models/product');
const { connectDB, closeDB, clearDB } = require('./setup');

// Minimal Express app for testing catalog endpoints
const app = express();
app.use(express.json());

app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

beforeAll(async () => await connectDB());
afterEach(async () => await clearDB());
afterAll(async () => await closeDB());

describe('Catalog API Endpoints', () => {
  it('GET /products should return an empty array when no products exist', async () => {
    const res = await request(app).get('/products');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('GET /products/:id should return a specific product', async () => {
    const product = await Product.create({
      name: 'Chocolate Cake',
      image: 'cake.jpg',
      category: 'Cakes',
      description: 'Delicious chocolate cake',
      new_price: 25,
    });

    const res = await request(app).get(`/products/${product._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Chocolate Cake');
    expect(res.body.new_price).toBe(25);
  });

  it('GET /products/:id should return 404 for non-existent ID', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).get(`/products/${fakeId}`);
    expect(res.statusCode).toBe(404);
  });
});