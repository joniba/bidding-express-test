var express = require('express');
var passport = require('passport');
var config = require('../config/oauth.js');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { user: req.user });
});

router.get('/login', function (req, res, next) {
  res.render('login', { user: req.user });
});

router.get('/auth/google', passport.authenticate('google', { scope: 'openid profile email' }));

router.get('/auth/google/callback', passport.authenticate('google', { successRedirect: '/', failureRedirect: '/login' }));

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
