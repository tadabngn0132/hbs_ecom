var express = require('express');
var router = express.Router();
var ProductModel = require('../models/ProductModel');

// GET method (READ feature) - Get all products
router.get('/product', async (req, res) => {
  try {
    var products = await ProductModel.find({}).populate('category');
    res.status(200).json(products);
  } catch (err) {
    res.status(400).send('Load product list failed !' + err);
  }
});

// POST method (CREATE feature) - Create a new product
router.post('/product/add', async (req, res) => {
  try {
    await ProductModel.create(req.body);
    res.status(201).send('Create product succeed !');
  } catch (err) {
    res.status(400).send('Create product failed !' + err);
  }
});

// PUT method (UPDATE feature) - Update a product by ID
router.put('/product/edit/:id', async (req, res) => {
  try {
    await ProductModel.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).send('Edit product succeed !');
  } catch (err) {
    res.status(400).send('Edit product failed !' + err);
  }
});

// DELETE method (DELETE feature) - Delete a product by ID
router.delete('/product/delete/:id', async (req, res) => {
  try {
    await ProductModel.findByIdAndDelete(req.params.id);
    res.status(200).send('Delete product succeed !');
  } catch (err) {
    res.status(400).send('Delete product failed !' + err);
  }
});

module.exports = router;