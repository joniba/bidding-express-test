var mongoose = require('mongoose');

module.exports = mongoose.model('Bid', {
  itemId: String,
  userId: String,
  amount: Number
});