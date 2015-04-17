'use strict';

var gulp = require('gulp');
var metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var templates = require('metalsmith-templates');
var permalinks = require('metalsmith-permalinks');

gulp.task('build', function(done) {
  metalsmith(__dirname)
    .use(markdown())
    .use(templates({
      engine: 'swig',
      directory: 'templates'
    }))
    .use(permalinks({
      pattern: ':title'
    }))
    .build(function(err) {
      if (err) {
        throw err;
      }

      done();
    });
});

gulp.task('default', ['build']);
