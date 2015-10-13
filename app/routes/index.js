exports.bids = require('./bids.js');
exports.items = require('./items.js');
exports.main = require('./main.js');

exports.route = function(app){
  app.use('/', this.main);
  app.use('/api/bids', this.bids);
  app.use('/api/items', this.items);
};