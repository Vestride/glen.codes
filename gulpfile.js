'use strict';

var exec = require('child_process').exec;
var connect = require('connect');
var serveStatic = require('serve-static');
var redirect = require('redirecter');
var compression = require('compression');
var gulp = require('gulp');
var gulpConnect = require('gulp-connect');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var gulpif = require('gulp-if');
var minifyCss = require('gulp-minify-css');
var minifyHtml = require('gulp-minify-html');
var rename = require('gulp-rename');
var svgmin = require('gulp-svgmin');
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

function logoTask() {
  return gulp.src('assets/g.svg')
    .pipe(rename('g-optimized.svg'))
    .pipe(svgmin())
    .pipe(gulp.dest('./build/assets/'));
}

function copyAssets() {
  return gulp.src('assets/**/*.*')
    .pipe(gulp.dest('build/assets/'));
}

function topLevelTask() {
  return gulp.src('top-level/*')
    .pipe(gulp.dest('build/'));
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

    app.use(compression());

    // Serve from /build
    app.use(serveStatic(__dirname + '/build', {
      maxAge: '2 weeks',
      setHeaders: function setCustomCacheControl(res, path) {
        var mime = serveStatic.mime.lookup(path);
        var age = 1209600;

        if (mime === 'text/html') {
          age = 0;
        }

        res.setHeader('Cache-Control', 'public, max-age=' + age);
      }
    }));
    app.listen(port);
  } else {
    gulpConnect.server({
      root: ['build'],
      port: port,
      livereload: true
    });
  }
}

function minifyHtmlTask() {
  return gulp.src('build/**/*.html')
    .pipe(minifyHtml())
    .pipe(gulp.dest('build/'));
}

function metalsmith(done) {
  metal(isProduction, done);
}

// Run metalsmith without gulp. Otherwise any new templates will be ignored.
// Starting and stopping the server and the watch (gaze) processes still don't
// trigger metalsmith to use the new templates.
function execMetalsmith(done) {
  exec('node gulp/execute-metalsmith.js', function() {
    gulpConnect.reload();
    done();
  });
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

gulp.task('logo', logoTask);
gulp.task('logo--cleaned', ['clean'], logoTask);

gulp.task('top-level', topLevelTask);
gulp.task('top-level--cleaned', ['clean'], topLevelTask);

gulp.task('assets', ['logo', 'top-level'], copyAssets);
gulp.task('assets--cleaned', ['clean', 'logo--cleaned', 'top-level--cleaned'], copyAssets);

gulp.task('assets-and-templates', ['assets'], execMetalsmith);
gulp.task('exec-metalsmith', execMetalsmith);

gulp.task('minify-html--cleaned', ['posts--cleaned'], minifyHtmlTask);
gulp.task('metalsmith-and-minify-html', ['exec-metalsmith'], minifyHtmlTask);

gulp.task('server', ['build'], connectMe);

// The whole thing.
gulp.task('build', ['posts--cleaned', 'css--cleaned', 'assets--cleaned', 'minify-html--cleaned']);

// Run live reload server and watch for changes.
gulp.task('watch', ['build'], function() {
  gulp.watch(['src/**/*.md', 'templates/**/*.*'], ['metalsmith-and-minify-html']);
  gulp.watch(['src/css/**/*.scss'], ['css']);
  gulp.watch(['!assets/*.svg', 'assets/*'], ['assets']);
  gulp.watch(['assets/*.svg'], ['assets-and-templates']);
  connectMe();
});

// Run server when no task is specified.
gulp.task('default', ['server']);
