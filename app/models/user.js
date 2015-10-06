var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
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

// UserSchema.pre('save', function(next) {
//   if (this.password) {
//     this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
//     this.password = this.hashPassword(this.password);
//   }
// 
//   next();
// });