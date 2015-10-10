var Bid = require('mongoose').model('Bid');

exports.getAll = function (req, res) {
	Bid.find(function (err, bids) {
		if (err)
			res.send(err);

		res.json(bids);
	});
};

exports.create = function (req, res) {
	Bid.create({
		itemId: req.body.itemId,
		userId: req.user._id,
		amount: req.body.amount
	}, function (err, bid) {
		if (err) res.send(err);

		Bid.find(function (err, bids) {
			if (err)
				res.send(err);

			res.json(bids);
		});
	});
};

exports.delete = function (req, res) {
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
};