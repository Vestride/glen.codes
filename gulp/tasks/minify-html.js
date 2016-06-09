'use strict';

const path = require('path');
const gulp = require('gulp');
const minifyHtml = require('gulp-minify-html');
const config = require('../config');

module.exports = function minifyHtmlTask() {
  return gulp.src(path.join(config.dist, '**/*.html'))
    .pipe(minifyHtml())
    .pipe(gulp.dest(config.dist));
};
