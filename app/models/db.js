var mongoose = require('mongoose');

exports.connect = function (url) {
  mongoose.connect(url);
};

exports.users = require('./user');
exports.bids = require('./bid');
exports.items = require('./item');