var gulp        = require('gulp');
var gutil       = require('gulp-util');
var browserSync = require('browser-sync').create();
var browserify  = require('browserify');
var uglify      = require('gulp-uglify');
var concat      = require('gulp-concat');
var clean       = require('gulp-clean');
var open        = require('open');

// process JS files and return the stream.
gulp.task('js', function () {
  return gulp.src('src/js/*.js')
    .pipe(browserify())
    .pipe(uglify())
    .pipe(gulp.dest('dist/bundle.js'))
    .on('error', gutil.log);
});

// create a task that ensures the `js` task is complete before
// reloading browsers
gulp.task('js-watch', ['js'], browserSync.reload);

// use default task to launch Browsersync and watch JS files
gulp.task('serve', ['js'], function () {

  // Serve files from the root of this project
  browserSync.init({
      server: {
          baseDir: "./src"
      }
  });

  // add browserSync.reload to the tasks array to make
  // all browsers reload after tasks are complete.
  gulp.watch("js/*.js", ['js-watch']);
});

gulp.task('default', function() {
});
