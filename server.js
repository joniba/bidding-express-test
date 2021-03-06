var express = require('express'),
  path = require('path'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  session = require('express-session'),
  passport = require('./passport'),
  db = require('./app/models'),
  router = require('./app/routes'),
  config = require('./config');

var app = express();

db.connect(config.mongooseUrl);
passport.setup(app);

app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(logResponseBody);
app.use(bodyParser.json({
  verify: function(req, res, buf, encoding) {
    console.log(req.path + ' [request]', buf.toString());
  }}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({secret: 'lmnop', saveUninitialized: false, resave: true}));

router.route(app);

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
    res.send({
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
    try {
      chunks.push(chunk);
    }
    catch (e) {
      console.log(e);
    }

    oldWrite.apply(res, arguments);
  };

  res.end = function (chunk) {
    try {
      if (chunk)
        chunks.push(chunk);

      var body = Buffer.concat(chunks).toString('utf8');
      console.log(req.path + ' [response]', body);
    }
    catch (e) {
      console.log(e);
    }
    oldEnd.apply(res, arguments);
  };

  next();
}

module.exports = app;