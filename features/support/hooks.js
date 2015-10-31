var app = require('../../server');
var server;

module.exports = function () {
  this.registerHandler('BeforeFeatures', function (event, done) {
    server = app.listen(process.env.PORT || '3000', done)
      .on('error', function (err) {
        // assume server is already running
        console.log('BeforeFeatures: failed to start server, continuing anyway');
        done(err);
      });
  });

  this.registerHandler('AfterFeatures', function (event, done) {
    server.close(done);
  });
};