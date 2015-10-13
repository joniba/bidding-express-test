module.exports = {
	mongooseUrl: process.env.MONGOLAB_URI || 'localhost:27017/bidding',
	oauth: {
		google: {
			realm: 'http://localhost:3000/',
			callbackUrl: 'http://localhost:3000/auth/google/callback',
			clientId: '798450452173-0e9dndphit3rp0cn4dreca33alnlogam.apps.googleusercontent.com',
			clientSecret: '50Yql-UZSA5N8EJ5Lco8hGA0'
		}
	}
};