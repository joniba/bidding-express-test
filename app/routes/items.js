var passport = require('passport');
var router = require('express').Router();
var items = require('../controllers/items.js');

// authenticate
router.use(passport.authenticate('basic', {session: false}));

router.route('/')
  .get(items.getAll)
  .post(items.create);

router.route('/:id')
  .delete(items.delete);

module.exports = router;