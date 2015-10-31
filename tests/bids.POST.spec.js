var request = require('supertest');
request = request(process.env.URL || 'http://localhost:3000');
var assert = require('chai').assert;
var app = require('../server');
var server;

describe('POST /api/bids', function () {
  this.timeout(10000);

  before(function (done) {
    server = app.listen(process.env.PORT || '3000', function () {

      //request.del('/api/items/1000')
      //  .auth('lala@gmail.com', 'abcd1234')
      //  .set('Content-Type', 'application/json')
      //  .send({})
      //  .end(done);

      request.post('/api/items')
        .auth('lala@gmail.com', 'abcd1234')
        .set('Content-Type', 'application/json')
        .send({_id: 1000, description: 'test'})
        .end(done);
    });
  });

  after(function (done) {
    server.close(done);
  });

  it('should return error when credentials are not provided', function (done) {
    request.post('/api/bids')
      .set('Content-Type', 'application/json')
      .send()
      .expect(401, done);
  });

  it('should return error when item ID is missing', function (done) {
    request.post('/api/bids')
      .auth('lala@gmail.com', 'abcd1234')
      .set('Content-Type', 'application/json')
      .send()
      .expect(function (res) {
        assert.propertyVal(res.body, 'message', 'Associated item could not be found.');
      })
      .expect(400, done);
  });

  it('should return error when item ID does not match existing item', function (done) {
    request.post('/api/bids')
      .auth('lala@gmail.com', 'abcd1234')
      .set('Content-Type', 'application/json')
      .send({itemId: 999999})
      .expect(function (res) {
        assert.propertyVal(res.body, 'message', 'Associated item could not be found.');
      })
      .expect(400, done);
  });

  it('should return error when amount is not provided', function (done) {
    request.post('/api/bids')
      .auth('lala@gmail.com', 'abcd1234')
      .set('Content-Type', 'application/json')
      .send({itemId: 1000})
      .expect(function (res) {
        assert.deepPropertyVal(res.body, 'error.errors.amount.kind', 'required');
      })
      .expect(400, done);
  });

  it('should add bid', function (done) {
    request.post('/api/bids')
      .auth('lala@gmail.com', 'abcd1234')
      .set('Content-Type', 'application/json')
      .send({itemId: 1000, amount: 100})
      .expect(200, done);
  });
});