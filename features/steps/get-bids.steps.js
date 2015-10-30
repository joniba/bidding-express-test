'user strict';
var request = require('superagent-bluebird-promise');
var url = process.env.URL || 'http://localhost:3000';
var assert = require('chai').assert;

module.exports = function () {

  this.Given(/^I am not authenticated$/, function (done) {
    this.user = null;
    done();
  });

  this.Given(/^I am authenticated$/, function (done) {
    this.user = {email: 'lala@gmail.com', password: 'abcd1234'};
    done();
  });

  this.Given(/^there are some bids for item '(\d+)'$/, function (arg1, done) {
    // TODO...
    done();
  });

  this.When(/^I get the bids for an item$/, function (done) {
    var req = request.get(url + '/api/bids');
    this.getResponse(req, done);
  });

  this.Then(/^I should get an error indicating that I am not authorized$/, function (done) {
    assert.equal(401, this.response.status, 'Unauthorized (HTTP status 401) response expected.');
    done();
  });

  this.Then(/^I should see all associated bids$/, function (done) {
    assert.equal(200, this.response.status);
    assert.isArray(this.response.body);
    done();
  });
};