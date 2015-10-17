var gulp = require('gulp'),
  plugins = require('gulp-load-plugins')(),
  spawn = require('child_process').spawn,
  node;

gulp.task('lint', function () {
  return gulp.src(['./**/*.js', '!./node_modules/**'])
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('default'));
});

gulp.task('test', function(){
  return gulp.src('./tests/*.spec.js').pipe(plugins.mocha());
});

// Taken from: https://gist.github.com/webdesserts/5632955
/**
 * $ gulp server
 * description: launch the server. If there's a server already running, kill it.
 */
gulp.task('server', function () {
  if (node) node.kill();
  node = spawn('node', ['--debug', 'bin/www'], { stdio: 'inherit' });
  node.on('close', function (code) {
    if (code === 8) {
      console.log('Error detected, waiting for changes...');
    }
  });
  node.on('error', function (err) {
    console.log(err.stack);
  });
});

gulp.task('default', ['lint', 'server', 'watch']);

gulp.task('watch', function () {
  gulp.watch(['./**/*.js', '!./node_modules/**'], ['lint', 'server']);
});

gulp.task('watch-test', ['test'], function () {
  gulp.watch(['./**/*.js', '!./node_modules/**'], ['test']);
});

// clean up if an error goes unhandled.
process.on('exit', function () {
  if (node) node.kill();
});