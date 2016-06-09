'use strict';

const path = require('path');
const gulp = require('gulp');
const rename = require('gulp-rename');
const svgmin = require('gulp-svgmin');
const config = require('../config');

module.exports = function logoTask() {
  return gulp.src(path.join(config.assets, 'g.svg'))
    .pipe(rename('g-optimized.svg'))
    .pipe(svgmin())
    .pipe(gulp.dest(config.distAssets));
};
