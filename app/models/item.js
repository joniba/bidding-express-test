var mongoose = require('mongoose');

var itemSchema = mongoose.Schema({
    _id: Number,
    description: String
});

module.exports = mongoose.model('Item', itemSchema);