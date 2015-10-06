var express = require('express');
var Bid = require('../models/bid.js');
var router = express.Router();

/* GET users listing. */
router.route('/')
  .get(function (req, res) {
    Bid.find(function (err, bids) {
      if (err)
        res.send(err);

      res.json(bids);
    });
  })
  .post(function (req, res) {
    Bid.create({
      itemId: '1',//req.body.itemId,
      userId: req.user,
      amount: req.body.amount
    }, function (err, bid) {
      if (err) res.send(err);

      Bid.find(function (err, bids) {
        if (err)
          res.send(err);

        res.json(bids);
      });
    });
  });

router.route('/:bid_id')
  .delete(function (req, res) {
    Bid.remove({
      _id: req.params.bid_id
    }, function (err, bid) {
      if (err) res.send(err);

      Bid.find(function (err, bids) {
        if (err)
          res.send(err);

        res.json(bids);
      });
    });
  });

module.exports = router;
