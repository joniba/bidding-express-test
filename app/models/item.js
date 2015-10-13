var mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
  _id: {type: Number, required: true},
  description: {type: String, required: true}
});

module.exports = mongoose.model('Item', itemSchema);