var gulp = require('gulp'),
  plugins = require('gulp-load-plugins')(),
  server = require('gulp-express');

gulp.task('server', function () {
  server.run(['--debug', 'bin/www']);
});

gulp.task('cucumber', function () {
  gulp.src('features/*')
    .pipe(plugins.cucumber({
      'steps': 'features/steps/*.steps.js',
      'support': 'features/support/*.js',
      'format': 'pretty'
    }));
    //.pipe(plugins.exit());
});

gulp.task('lint', function () {
  return gulp.src(['./**/*.js', '!./node_modules/**'])
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('default'));
});

gulp.task('mocha', function () {
  return gulp.src('./tests/*.spec.js').pipe(plugins.mocha());
});

gulp.task('watch', function () {
  gulp.watch(['./**/*.js', '!./node_modules/**'], ['lint', 'server']);
});

gulp.task('watch-test', ['test'], function () {
  gulp.watch(['./**/*.js', '!./node_modules/**'], ['test']);
});

gulp.task('default', ['lint', 'server', 'watch']);