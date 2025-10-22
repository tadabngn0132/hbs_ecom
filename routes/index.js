var express = require('express');
var router = express.Router();
var checkLoginSession = require('../middlewares/auth');

/* GET home page. */
router.get('/', checkLoginSession, function(req, res, next) {
  res.render('index', { layout: 'home_layout' });
});

module.exports = router;