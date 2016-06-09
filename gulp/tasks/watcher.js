'use strict';

const gulp = require('gulp');

module.exports = function () {
  gulp.watch(['src/**/*.md', 'templates/**/*.*'], ['templates']);
  gulp.watch(['src/css/**/*.scss'], ['css']);
  gulp.watch(['!assets/*.svg', 'assets/*'], ['assets']);
  gulp.watch(['assets/*.svg'], ['assets-and-templates']);
};
