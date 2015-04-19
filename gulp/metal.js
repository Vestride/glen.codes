'use strict';

var path = require('path');
var metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var templates = require('metalsmith-templates');
var permalinks = require('metalsmith-permalinks');

module.exports = function(done) {
  metalsmith(path.join(__dirname, '..'))
    .clean(false)
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

      if (done) {
        done();
      }
    });
};
