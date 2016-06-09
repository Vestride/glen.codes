'use strict';

const gulp = require('gulp');
const sequence = require('gulp-sequence');

require('gulp-load-tasks')('gulp/tasks');

gulp.task('assets', sequence(
  [
    'top-level',
    'logo',
  ],
  'copy-assets'
));

gulp.task('templates', sequence(
  'exec-metalsmith',
  'minify-html'
));

gulp.task('assets-and-templates', sequence(
  'assets',
  'templates'
));

// The whole thing.
gulp.task('run-build', sequence(
  'clean',
  [
    'css',
    'metalsmith',
    'assets',
  ],
  'minify-html'
));

gulp.task('watch', sequence(
  'run-build',
  'watcher',
  'local-server'
));

gulp.task('server', sequence(
  'run-build',
  'production-server'
));

// Run server when no task is specified.
gulp.task('default', ['server']);
