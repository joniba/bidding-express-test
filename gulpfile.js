var gulp = require('gulp'),
  plugins = require('gulp-load-plugins')(),
  server = require('gulp-express');

gulp.task('server', function (done) {
  server.run(['--debug', 'bin/www']);

  setTimeout(done, 1000);
});

gulp.task('stop-test-server', ['mocha'], function (done) {
  server.stop();
});

gulp.task('cucumber', ['server'], function () {
  return gulp.src('features/*')
    .pipe(plugins.cucumber({
      'steps': 'features/steps/*.steps.js',
      'support': 'features/support/*.js',
      'format': 'pretty'
    }));
});

gulp.task('lint', function () {
  return gulp.src(['./**/*.js', '!./node_modules/**'])
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('default'));
});

gulp.task('mocha', function () {
  return gulp.src('./tests/*.spec.js')
    .pipe(plugins.mocha())
    .pipe(plugins.exit());
});

gulp.task('watch', function () {
  gulp.watch(['./**/*.js', '!./node_modules/**'], ['lint', 'server']);
});

gulp.task('watch-test', ['test'], function () {
  gulp.watch(['./**/*.js', '!./node_modules/**'], ['test']);
});

gulp.task('default', ['lint', 'server', 'watch']);
gulp.task('test', ['server', 'cucumber', 'stop-test-server']);
gulp.task('test-mocha', ['server', 'mocha', 'stop-test-server']);