var express = require('express');
var router = express.Router();
const { checkLoginSession, checkSingleSession } = require('../middlewares/auth');

/* GET home page. */
router.get('/', checkLoginSession, function(req, res, next) {
  res.render('index', { layout: 'home_layout' });
});

// Admin page
router.get('/admin', checkSingleSession(), function(req, res, next) {
  res.render('index', { layout: 'home_layout' });
});

// User page
router.get('/user', checkLoginSession, function(req, res, next) {
  res.render('index', { layout: 'home_layout' });
});

module.exports = router;