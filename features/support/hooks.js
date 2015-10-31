//var app = require('../../server');
//var server;
//
//module.exports = function () {
//  this.registerHandler('BeforeFeatures', function (event, done) {
//    server = app.listen(process.env.PORT || '3000', function () {
//      console.log('BeforeFeatures: server started');
//      done();
//    })
//      .on('error', function (err) {
//        // assume server is already running
//        console.log('BeforeFeatures: failed to start server, continuing anyway');
//        done();
//      });
//  });
//
//  this.registerHandler('AfterFeatures', function (event, done) {
//    if (server) {
//      console.log('AfterFeatures: shutting down server')
//      server.close(function () {
//        console.log('AfterFeatures: server shut down');
//        process.exit();
//        done();
//      });
//    }
//    else {
//      done();
//    }
//  });
//};