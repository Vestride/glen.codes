'use strict';

var exec = require('child_process').exec;
var gulp = require('gulp');
var connect = require('gulp-connect');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var del = require('del');
var metal = require('./gulp/metal');

function cssTask() {
  return gulp.src('src/css/**/*.scss')
    .pipe(sass())
    .on('error', function(err) {
      console.log(err);
    })
    .pipe(autoprefixer())
    .pipe(gulp.dest('build/css/'))
    .pipe(connect.reload());
}

// Convert posts from markdown to a blog structure.
gulp.task('posts', metal);
gulp.task('posts--cleaned', ['clean'], metal);

// Remove build files.
gulp.task('clean', function(done) {
  del(['build'], done);
});

// Compile sass and autoprefix.
gulp.task('css', cssTask);
gulp.task('css--cleaned', ['clean'], cssTask);

// Run metalsmith without gulp. Otherwise any new templates will be ignored.
// Starting and stopping the server and the watch (gaze) processes still don't
// trigger metalsmith to use the new templates.
gulp.task('exec-metalsmith', function(done) {
  exec('node gulp/execute-metalsmith.js', function() {
    connect.reload();
    done();
  });
});

// Run live reload server and watch for changes.
gulp.task('server', ['watch'], function connectMe() {
  var isLocal = !process.env.PORT;
  connect.server({
    root: ['build'],
    port: process.env.PORT || 8888,
    livereload: isLocal
  });
});

// The whole thing.
gulp.task('build', ['posts--cleaned', 'css--cleaned']);

// Watch for changes.
gulp.task('watch', ['build'], function() {
  gulp.watch(['src/**/*.md', 'templates/**/*.*'], ['exec-metalsmith']);
  gulp.watch(['src/css/**/*.scss'], ['css']);
});

// Run server when no task is specified.
gulp.task('default', ['server']);
