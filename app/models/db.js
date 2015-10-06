var mongoose = require('mongoose');

exports.connect = function (url) {
  mongoose.connect(url);
};

exports.User = require('./user');
exports.Bid = require('./bid');