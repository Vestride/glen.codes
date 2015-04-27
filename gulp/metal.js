'use strict';

var path = require('path');
var metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var templates = require('metalsmith-templates');
var permalinks = require('metalsmith-permalinks');
var collections = require('metalsmith-collections');
// var branch = require('metalsmith-branch');
var excerpts = require('metalsmith-excerpts');
var prism = require('prismjs');
var renderer = require('./marked-renderer');

// https://azurelogic.com/posts/building-a-blog-with-metalsmith/

// Translate marked languages to prism.
var extensions = {
  js: 'javascript',
  scss: 'css',
  sass: 'css',
  html: 'markup',
  svg: 'markup',
  xml: 'markup',
  py: 'python',
  rb: 'ruby',
  ps1: 'powershell',
  psm1: 'powershell'
};

var mdOptions = {
  gfm: true,
  smartypants: true,
  renderer: renderer,
  langPrefix: 'language-',
  highlight: function(code, lang) {
    if (!prism.languages.hasOwnProperty(lang)) {
      // Default to markup.
      lang = extensions[lang] || 'markup';
    }

    return prism.highlight(code, prism.languages[lang]);
  }
};

module.exports = function(isProduction, done) {
  metalsmith(path.join(__dirname, '..'))
    .metadata({
      githubSrc: 'https://github.com/Vestride/glen.codes/blob/master/',
      url: 'https://glen.codes'
    })
    .clean(false)
    .use(markdown(mdOptions))
    .use(excerpts())
    .use(collections({
      posts: {
        sortBy: 'published',
        reverse: true,
        refer: true
      }
    }))
    .use(permalinks({
      pattern: ':title'
    }))
    .use(templates({
      engine: 'swig',
      directory: 'templates',
      locals: {
        isProduction: isProduction
      }
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
