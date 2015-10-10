var passport = require('passport'),
	crypto = require('crypto'),
	config = require('./config'),
	db = require('./app/models'),
	LocalStrategy = require('passport-local').Strategy,
	GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

exports.setup = function (app) {

	app.use(passport.initialize());
	app.use(passport.session());

	passport.serializeUser(function (user, done) {
		done(null, user._id);
	});

	passport.deserializeUser(function (obj, done) {
		done(null, obj);
	});

	passport.use(new LocalStrategy(
		function (username, password, cb) {
			db.users.findOne({ username: username }, function (err, user) {
				if (err) { return cb(err); }
				if (!user) { return cb(null, false, { message: 'Incorrect username or password' }); }

				var hash = crypto.pbkdf2Sync(password, user.salt, 4096, 512).toString('base64');

				if (user.password != hash) { return cb(null, false, { message: 'Incorrect username or password' }); }
				return cb(null, user);
			});
		}));

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