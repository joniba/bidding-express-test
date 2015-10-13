var express = require('express'),
  path = require('path'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  session = require('express-session'),
  passport = require('./passport'),
  db = require('./app/models'),
  routes = require('./app/routes'),
  config = require('./config');

var app = express();

db.connect(config.mongooseUrl);
passport.setup(app);

app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(logResponseBody);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'lmnop' }));

app.use('/', routes.main);
app.use('/api/bids', routes.bids);

//
// error handling
//

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: err,
      stack: err.stack
    });
  });
}
else {
  // production error handler
  // no stacktraces leaked to user
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send('error', {
      message: err.message,
      error: {}
    });
  });
}

function logResponseBody(req, res, next) {
  var oldWrite = res.write,
    oldEnd = res.end;

  var chunks = [];

  res.write = function (chunk) {
    chunks.push(chunk);

    oldWrite.apply(res, arguments);
  };

  res.end = function (chunk) {
    if (chunk)
      chunks.push(chunk);

    var body = Buffer.concat(chunks).toString('utf8');
    console.log(req.path, body);

    oldEnd.apply(res, arguments);
  };

  next();
}

module.exports = app;