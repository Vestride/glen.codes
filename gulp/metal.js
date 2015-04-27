'use strict';

var path = require('path');
var metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var templates = require('metalsmith-templates');
var permalinks = require('metalsmith-permalinks');
var collections = require('metalsmith-collections');
// var branch = require('metalsmith-branch');
var excerpts = require('metalsmith-excerpts');
var marked = require('marked');
var prism = require('prismjs');

// https://azurelogic.com/posts/building-a-blog-with-metalsmith/

var renderer = new marked.Renderer();

// Change the code method to output the same as Prism.js would.
renderer.code = function(code, lang, escaped) {
  code = this.options.highlight(code, lang);

  if (!lang) {
    return '<pre><code>' + code + '\n</code></pre>';
  }

  // e.g. "language-js"
  var langClass = this.options.langPrefix + lang;

  return '<pre class="' + langClass + '"><code class="' + langClass + '">' +
    code +
    '</code></pre>\n';
};

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

module.exports = function(isProduction, done) {
  metalsmith(path.join(__dirname, '..'))
    .clean(false)
    .use(markdown({
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
    }))
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
