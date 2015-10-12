var mongoose = require('mongoose');
var Item = require('./item');
var User = require('./user');

module.exports = mongoose.model('Bid', {
  item: {
    type: Number,
    ref: 'Item',
    required: 'itemId is required'
  },
  user: {
    type: String,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
});