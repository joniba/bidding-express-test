var express = require('express');
var passport = require('passport');
var path = require('path');
var User = require('mongoose').model('User');

exports.renderLogin = function (req, res, next) {
  res.sendfile(path.join(__dirname + '/../../public/login.html'));
};

exports.login = passport.authenticate('local', { successRedirect: '/' });

exports.logout = function (req, res) {
  req.logout();
  res.redirect('/');
};

exports.register = function (req, res, next) {
  if (req.user)
    res.redirect('/');

  var user = new User(req.body);
  user.save(function (err) {
    if (err) {
      next(err);
    }
    req.login(user, function (err) {
      if (err) {
        next(err);
      }
    });
  });
};