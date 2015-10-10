var passport = require('passport');
var router = require('express').Router();
var bids = require('../controllers/bids.js');

// authenticate
router.use(passport.authenticate('basic', {session: false}));

router.route('/')
  .get(bids.getAll)
  .post(bids.create);

router.route('/:bid_id')
  .delete(bids.delete);

module.exports = router;