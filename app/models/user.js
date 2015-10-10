var mongoose = require('mongoose');
var crypto = require('crypto');

var userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: 'email is required',
    match: [/.+\@.+\..+/, "Please fill a valid e-mail address."]
  },
  password: {
    type: String,
    match: [/\w+/, "Password must be alphanumeric."],
    required: 'Password is required.',
    minlength: [6, 'Password should be at least 6 characters in length.']
  },
  salt: {
    type: String
  }
});

userSchema.methods.authenticate = function (password) {
  return this.password === this.hash(password);
};

userSchema.methods.hash = function (password) {
  return crypto.pbkdf2Sync(password, this.salt, 4096, 512).toString('base64');
};

userSchema.pre('save', function (next) {
  if (this.password) {
    // TODO: Why does it need to go in a buffer?
    this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
    this.password = this.hash(this.password);
  }

  next();
});

module.exports = mongoose.model('User', userSchema);

// UserSchema.pre('save', function(next) {
//   if (this.password) {
//     this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
//     this.password = this.hashPassword(this.password);
//   }
// 
//   next();
// });