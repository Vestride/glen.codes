'use strict';

var exec = require('child_process').exec;
var connect = require('connect');
var serveStatic = require('serve-static');
var redirect = require('redirecter');
var gulp = require('gulp');
var gulpConnect = require('gulp-connect');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var gulpif = require('gulp-if');
var minifyCss = require('gulp-minify-css');
var del = require('del');
var metal = require('./gulp/metal');
var argv = require('yargs').argv;

var isProduction = process.env.PORT || !!argv.production;

function cssTask() {
  return gulp.src('src/css/**/*.scss')
    .pipe(sass())
    .on('error', function(err) {
      console.log(err);
    })
    .pipe(autoprefixer())
    .pipe(gulpif(isProduction, minifyCss()))
    .pipe(gulp.dest('build/css/'))
    .pipe(gulpif(!isProduction, gulpConnect.reload()));
}

function assetsTask() {
  return gulp.src('assets/**/*.*')
    .pipe(gulp.dest('build/assets/'));
}

function connectMe() {
  var port = process.env.PORT || 8888;
  if (isProduction) {
    var app = connect();

    // Redirect requests to herokuapp.com to custom domain.
    app.use(function handleRequest(req, res, next) {
      if (req.headers.host === 'glencodes.herokuapp.com') {
        redirect(req, res, {
          target: 'https://glen.codes' + req.url,
          statusCode: 301
        });
      } else {
        next();
      }
    });

    // Serve from /build
    app.use(serveStatic(__dirname + '/build'));
    app.listen(port);
  } else {
    gulpConnect.server({
      root: ['build'],
      port: port,
      livereload: true
    });
  }
}

function metalsmith(done) {
  metal(isProduction, done);
}

// Convert posts from markdown to a blog structure.
gulp.task('posts', metalsmith);
gulp.task('posts--cleaned', ['clean'], metalsmith);

// Remove build files.
gulp.task('clean', function(done) {
  del(['build'], done);
});

// Compile sass and autoprefix.
gulp.task('css', cssTask);
gulp.task('css--cleaned', ['clean'], cssTask);

gulp.task('assets', assetsTask);
gulp.task('assets--cleaned', ['clean'], assetsTask);

// Run metalsmith without gulp. Otherwise any new templates will be ignored.
// Starting and stopping the server and the watch (gaze) processes still don't
// trigger metalsmith to use the new templates.
gulp.task('exec-metalsmith', function(done) {
  exec('node gulp/execute-metalsmith.js', function() {
    gulpConnect.reload();
    done();
  });
});

gulp.task('server', ['build'], connectMe);

// The whole thing.
gulp.task('build', ['posts--cleaned', 'css--cleaned', 'assets--cleaned']);

// Run live reload server and watch for changes.
gulp.task('watch', ['build'], function() {
  gulp.watch(['src/**/*.md', 'templates/**/*.*'], ['exec-metalsmith']);
  gulp.watch(['src/css/**/*.scss'], ['css']);
  connectMe();
});

// Run server when no task is specified.
gulp.task('default', ['server']);
