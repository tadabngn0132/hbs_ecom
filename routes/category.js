var express = require('express');
var router = express.Router();
var CategoryModel = require('../models/CategoryModel');
var ProductModel = require('../models/ProductModel');
const { checkLoginSession, checkSingleSession, checkMultipleSession } = require('../middlewares/auth');

// GET category list
router.get('/', checkMultipleSession(['user', 'admin']), async function(req, res) {
  var categoryList = await CategoryModel.find({});
  res.render('category/index', { categoryList });
});

// GET add category page
router.get('/add', checkSingleSession(), function(req, res) {
  res.render('category/add');
});

// POST add category
router.post('/add', checkSingleSession(), async function(req, res) {
  var category = req.body;
  await CategoryModel.create(category);
  res.redirect('/category');
});

// GET delete category
router.get('/delete/:id', checkSingleSession(), async function(req, res) {
  await CategoryModel.deleteOne({ _id: req.params.id });
  res.redirect('/category');
});

// GET category detail (FILTER products by category)
router.get('/detail/:id', checkLoginSession, async function(req, res) {
  var id = req.params.id;
  var productList = await ProductModel.find({ category: id });
  res.render('product/index', { productList });
});

module.exports = router;