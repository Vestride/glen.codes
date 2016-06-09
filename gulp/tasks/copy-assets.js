'use strict';

const gulp = require('gulp');
const path = require('path');
const config = require('../config');

module.exports = function copyAssets() {
  return gulp.src(path.join(config.root, 'assets/**/*.*'))
    .pipe(gulp.dest(path.join(config.dist, 'assets')));
};
