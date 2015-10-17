function World(callback) {
  var context = this;

  this.handleResponse = function (err, res, done) {
    if (err && !err.response)
      done(err);
    context.response = res;
    done();
  };

  this.getResponse = function (req, done) {
    if(context.user)
      req.auth(context.user.email, context.user.password);

    req.end(function (err, res) {
      context.handleResponse(err, res, done)
    });
  };

  callback();
}

module.exports = function () {
  this.World = World;
};