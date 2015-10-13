'use strict';

var Item = require('mongoose').model('Item');

var self = {
  getAll: function (req, res, next) {
    Item.find(null, null, {limit: 30})
      .exec(function (err, items) {
        if (err)
          return next(err);

        res.json(items);
      });
  },

  create: function (req, res, next) {
    var item = new Item(req.body);
    item.save(function (err, bid) {
        if (err) {
          return next(err);
        }

        res.json(bid);
      });
  },

  delete: function (req, res, next) {
    Item.remove({
      _id: req.params.id
    }, function (err, result) {
      if (err) {
        return next(err);
      }

      res.json(result);
    });
  }
};

module.exports = self;