'use strict';

const path = require('path');
const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const gulpif = require('gulp-if');
const minifyCss = require('gulp-clean-css');
const gulpConnect = require('gulp-connect');
const config = require('../config');

module.exports = function cssTask() {
  return gulp.src('src/css/**/*.scss')
    .pipe(sass())
    .on('error', (err) => {
      console.log(err);
    })
    .pipe(autoprefixer())
    .pipe(gulpif(config.isProduction, minifyCss()))
    .pipe(gulp.dest(path.join(config.dist, 'css')))
    .pipe(gulpif(!config.isProduction, gulpConnect.reload()));
};
