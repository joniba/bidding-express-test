var passport = require('passport'),
    db = require('./app/models'),
    LocalStrategy = require('passport-local').Strategy,
    BasicStrategy = require('passport-http').BasicStrategy;

exports.setup = function (app) {

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function (obj, done) {
        done(null, obj);
    });

    passport.use(new LocalStrategy(authenticate));
    passport.use(new BasicStrategy(authenticate));

    /*passport.use(new GoogleStrategy({
     clientID: config.oauth.google.clientId,
     clientSecret: config.oauth.google.clientSecret,
     callbackURL: config.oauth.google.callbackUrl
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
     ));*/
};

var authenticate = function (email, password, done) {
    db.users.findOne({email: email}, function (err, user) {
        if (err) {
            return done(err);
        }

        if (!user) {
            return done(null, false, {message: 'Incorrect username or password'});
        }

        if (!user.authenticate(password)) {
            return done(null, false, {message: 'Incorrect username or password'});
        }

        return done(null, user);
    });
};