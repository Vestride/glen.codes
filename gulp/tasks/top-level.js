'use strict';

const path = require('path');
const gulp = require('gulp');
const config = require('../config');

module.exports = function topLevelTask() {
  return gulp.src(path.join(config.topLevel, '*'))
    .pipe(gulp.dest(config.dist));
};
