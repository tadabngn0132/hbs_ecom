var express = require('express');
var router = express.Router();
var ProductModel = require('../models/ProductModel');
const { checkLoginSession, checkSingleSession, checkMultipleSession } = require('../middlewares/auth');

//import and config "multer" package
var multer = require('multer');

//generate an unique value for image name prefix
var prefix = Date.now();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images/'); //set image upload location
  },
  filename: (req, file, cb) => {
    let fileName = prefix + "_" + file.originalname; //set final image name
    cb(null, fileName);
  }
});

const upload = multer({ storage: storage })

// GET product list
router.get('/', checkMultipleSession(['user', 'admin']), async (req, res) => {
  var productList = await ProductModel.find({}).populate('category');
  res.render('product/index', { productList });
});

// GET add product page
router.get('/add', checkSingleSession(), async (req, res) => {
  var CategoryModel = require('../models/CategoryModel');
  var categoryList = await CategoryModel.find({});
  res.render('product/add', { categoryList });
});

// POST add product (WITH VALIDATION and IMAGE UPLOAD)
router.post('/add', upload.single('image'), async (req, res) => {
  try {
    var product = req.body;
    
    // Check if file was uploaded
    if (req.file) {
      product.image = prefix + "_" + req.file.originalname;
    }
    // If no file, keep the URL from input (if provided)
    
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
router.get('/delete/:id', checkSingleSession(), async (req, res) => {
  await ProductModel.deleteOne({ _id: req.params.id });
  res.redirect('/product');
});

// POST search product
router.post('/search', checkLoginSession, async (req, res) => {
  var keyword = req.body.keyword;
  var productList = await ProductModel.find({ 
    name: new RegExp(keyword, "i") 
  }).populate('category');
  res.render('product/index', { productList });
});

// GET sort ascending
router.get('/sort/asc', checkLoginSession, async (req, res) => {
  var productList = await ProductModel.find().sort({ name: 1 }).populate('category');
  res.render('product/index', { productList });
});

// GET sort descending
router.get('/sort/desc', checkLoginSession, async (req, res) => {
  var productList = await ProductModel.find().sort({ name: -1 }).populate('category');
  res.render('product/index', { productList });
});

module.exports = router;