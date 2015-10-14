var request = require('supertest');
request = request(process.env.URL || 'http://localhost:3000');
var assert = require('chai').assert;

describe('GET /api/bids', function(){
  this.timeout(10000);

  it('should return error when credentials are not provided', function(done){
    request.get('/api/bids')
      .expect(401, done);
  });

  it('should return array of bids', function(done){
    request.get('/api/bids')
      .auth('lala@gmail.com', 'abcd1234')
      .expect(function(res){
        assert.isArray(res.body);
      })
      .expect(200, done);
  });
});
