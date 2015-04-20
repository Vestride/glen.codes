'use strict';

var path = require('path');
var metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var templates = require('metalsmith-templates');
var permalinks = require('metalsmith-permalinks');
var prism = require('prismjs');

// Translate marked languages to prism.
var extensions = {
  js: 'javascript',
  html: 'markup',
  svg: 'markup',
  xml: 'markup',
  py: 'python',
  rb: 'ruby',
  ps1: 'powershell',
  psm1: 'powershell'
};

module.exports = function(done) {
  metalsmith(path.join(__dirname, '..'))
    .clean(false)
    .use(markdown({
      gfm: true,
      smartypants: true,
      highlight: function(code, lang) {
        lang = extensions[lang];
        return prism.highlight(code, prism.languages[lang]);
      }
    }))
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
