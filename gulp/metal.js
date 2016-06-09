'use strict';

const path = require('path');
const metalsmith = require('metalsmith');
const markdown = require('metalsmith-markdown');
const layouts = require('metalsmith-layouts');
const permalinks = require('metalsmith-permalinks');
const collections = require('metalsmith-collections');

// const branch = require('metalsmith-branch');
const excerpts = require('metalsmith-excerpts');
const prism = require('prismjs');
const renderer = require('./marked-renderer');
const pkg = require(path.join(__dirname, '../package.json'));
const config = require('./config');

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
  psm1: 'powershell',
};

var mdOptions = {
  gfm: true,
  smartypants: true,
  renderer: renderer,
  langPrefix: 'language-',
  highlight: function (code, lang) {
    if (!prism.languages.hasOwnProperty(lang)) {
      // Default to markup.
      lang = extensions[lang] || 'markup';
    }

    return prism.highlight(code, prism.languages[lang]);
  },
};

module.exports = function (done) {
  metalsmith(config.root)
    .metadata({
      githubSrc: 'https://github.com/Vestride/glen.codes/blob/master/',
      isProduction: config.isProduction,
      site: {
        url: 'https://glen.codes',
        name: pkg.name,
        description: pkg.description,
      },
    })
    .clean(false)
    .use(markdown(mdOptions))
    .use(excerpts())
    .use(collections({
      posts: {
        sortBy: 'published',
        reverse: true,
        refer: true,
      },
    }))
    .use(permalinks({
      pattern: ':title',
    }))
    .use(layouts({
      engine: 'swig',
      directory: 'templates',
    }))
    .build(function (err) {
      if (err) {
        throw err;
      }

      if (done) {
        done();
      }
    });
};
