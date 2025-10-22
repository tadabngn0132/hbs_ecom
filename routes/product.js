var express = require('express');
var router = express.Router();
var ProductModel = require('../models/ProductModel');
var checkLoginSession = require('../middlewares/auth');

// GET product list
router.get('/', checkLoginSession, async function(req, res) {
  var productList = await ProductModel.find({}).populate('category');
  res.render('product/index', { productList });
});

// GET add product page
router.get('/add', checkLoginSession, async function(req, res) {
  var CategoryModel = require('../models/CategoryModel');
  var categoryList = await CategoryModel.find({});
  res.render('product/add', { categoryList });
});

// POST add product (WITH VALIDATION)
router.post('/add', checkLoginSession, async function(req, res) {
  try {
    var product = req.body;
    await ProductModel.create(product);
    res.redirect('/product');
  } catch (err) {
    if (err.name === 'ValidationError') {
      let InputErrors = {};
      for (let field in err.errors) {
        InputErrors[field] = err.errors[field].message;
      }
      var CategoryModel = require('../models/CategoryModel');
      var categoryList = await CategoryModel.find({});
      res.render('product/add', { InputErrors, product, categoryList });
    } else {
      res.send(err);
    }
  }
});

// GET delete product
router.get('/delete/:id', checkLoginSession, async function(req, res) {
  await ProductModel.deleteOne({ _id: req.params.id });
  res.redirect('/product');
});

// POST search product
router.post('/search', checkLoginSession, async function(req, res) {
  var keyword = req.body.keyword;
  var productList = await ProductModel.find({ 
    name: new RegExp(keyword, "i") 
  }).populate('category');
  res.render('product/index', { productList });
});

// GET sort ascending
router.get('/sort/asc', checkLoginSession, async function(req, res) {
  var productList = await ProductModel.find().sort({ name: 1 }).populate('category');
  res.render('product/index', { productList });
});

// GET sort descending
router.get('/sort/desc', checkLoginSession, async function(req, res) {
  var productList = await ProductModel.find().sort({ name: -1 }).populate('category');
  res.render('product/index', { productList });
});

module.exports = router;