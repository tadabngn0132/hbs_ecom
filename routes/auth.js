var express = require('express');
var router = express.Router();
var UserModel = require('../models/UserModel');
var bcrypt = require('bcryptjs');
var salt = 8;

// GET register page
router.get('/register', (req, res) => {
  res.render('auth/register', { layout: 'auth_layout' });
});

// POST register
router.post('/register', async (req, res) => {
  try {
    var userRegistration = req.body;
    var hashPassword = bcrypt.hashSync(userRegistration.password, salt);
    var user = {
      username: userRegistration.username,
      password: hashPassword
    }
    await UserModel.create(user);
    res.redirect('/auth/login');
  } catch (err) {
    res.send(err);
  }
});

// GET login page
router.get('/login', (req, res) => {
  res.render('auth/login', { layout: 'auth_layout' });
});

// POST login
router.post('/login', async (req, res) => {
  try {
    var userLogin = req.body;
    var user = await UserModel.findOne({ username: userLogin.username });
    
    if (!user) {
      res.redirect('/auth/login');
      return;
    }
    
    var hash = bcrypt.compareSync(userLogin.password, user.password);
    
    if (hash) {
      req.session.username = user.username;
      res.redirect('/');
    } else {
      res.redirect('/auth/login');
    }
  } catch (err) {
    res.send(err);
  }
});

// GET logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect("/auth/login");
});

module.exports = router;