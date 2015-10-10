'use strict';

var Bid = require('mongoose').model('Bid');


var self = {
  getAll: function (req, res) {
    Bid.find(null, null, {limit: 30})
      .populate('item')
      .exec(function (err, bids) {
        if (err)
          res.send(err);

        res.json(bids);
      });
  },

  create: function (req, res) {
    Bid.create({
      item: req.body.itemId,
      userId: req.user._id,
      amount: req.body.amount
    }, function (err, bid) {
      if (err) {
        res.send(err);
      }

      self.getAll(req, res);
    });
  },

  delete: function (req, res) {
    Bid.remove({
      _id: req.params.bid_id
    }, function (err, bid) {
      if (err) {
        res.send(err);
      }

      self.getAll(req, res);
    });
  }
};

module.exports = self;