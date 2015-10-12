'use strict';

var Bid = require('mongoose').model('Bid');
var Item = require('mongoose').model('Item');

var self = {
  getAll: function (req, res, next) {
    Bid.find(null, null, {limit: 30})
      .populate('item')
      .populate('user', 'email')
      .exec(function (err, bids) {
        if (err)
          next(err);

        res.json(bids);
      });
  },

  create: function (req, res, next) {
    Item.findOne({_id: req.body.itemId}, function (err, item) {
      if (err)
        next(err);

      if (!item) {
        err = new Error('Associated item could not be found.');
        err.status = 400;
        next(err);
      }

      Bid.create({
        item: req.body.itemId,
        user: req.user._id,
        amount: req.body.amount
      }, function (err, bid) {
        if (err) {
          next(err);
        }

        bid.item = item;
        res.json(bid);
      });
    });
  },

  delete: function (req, res, next) {
    Bid.remove({
      _id: req.params.bid_id
    }, function (err, result) {
      if (err) {
        next(err);
      }

      res.json(result);
    });
  }
};

module.exports = self;