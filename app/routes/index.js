var express = require('express');
var passport = require('passport');
var config = require('../../config.js');
var path = require('path');

var router = express.Router();

router.get('/', function(req, res) {
  res.sendfile(path.join(__dirname + '/../../public/bids.html'));
});

router.get('/login', function (req, res, next) {
  res.sendfile(path.join(__dirname + '/../../public/login.html'));
});

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

// router.get('/auth/google', passport.authenticate('google', { scope: 'openid profile email' }));
// router.get('/auth/google/callback', passport.authenticate('google'));//, { successRedirect: '/', failureRedirect: '/' }));

module.exports = router;
