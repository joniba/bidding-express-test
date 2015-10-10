var mongoose = require('mongoose');
var Item = require('./item');

module.exports = mongoose.model('Bid', {
  item: {type: Number, ref: 'Item'},
  userId: String,
  amount: Number
});