var express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    session = require('express-session'),
    config = require('./config/oauth.js'),
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    methodOverride = require('method-override'),
    mongoose = require('mongoose');

mongoose.connect('localhost:27017');

var app = express();
var routes = require('./routes/index');
app.use('/', routes);

app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(cookieParser());
app.use(methodOverride());
app.use(session({ secret: 'lmnop' }));

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
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//
// passport
//
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(new GoogleStrategy({
  clientID: config.google.clientId,
  clientSecret: config.google.clientSecret,
  callbackURL: config.google.callbackUrl
},
  function (accessToken, refreshToken, profile, done) {
  //User.findOrCreate({ googleId: profile.id }, function (err, user) {
    return done(null, profile);
  //});
}
  //function (identifier, profile, done) {
  // To keep the example simple, the user's Google profile is returned to
  // represent the logged-in user.  In a typical application, you would want
  // to associate the Google account with a user record in your database,
  // and return that user instead.
  //profile.identifier = identifier;
  //return done(null, profile);
));

module.exports = app;