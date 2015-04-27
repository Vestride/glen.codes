'use strict';

var marked = require('marked');

var renderer = new marked.Renderer();

var gridOpen = '<div class="container"><div class="row">' +
  '<div class="col-sm-12"><div class="markdown-body">';
var gridClose = '</div></div></div></div>';
var codeGridOpen = '<div class="code-block container"><div class="row">' +
  '<div class="col-sm-12"><div class="markdown-body">';

// Change the code method to output the same as Prism.js would.
renderer.code = function(code, lang, escaped) {
  code = this.options.highlight(code, lang);

  if (!lang) {
    return '<pre><code>' + code + '\n</code></pre>';
  }

  // e.g. "language-js"
  var langClass = this.options.langPrefix + lang;

  return gridClose +
    codeGridOpen +
    '<pre class="' + langClass + '"><code class="' + langClass + '">' +
    code +
    '</code></pre>' +
    gridClose +
    gridOpen;
};

renderer.heading = function(text, level, raw) {
  var id = this.options.headerPrefix + raw.toLowerCase().replace(/[^\w]+/g, '-');
  return '<h' +
    level +
    ' class="heading" id="' +
    id +
    '">' +
    '<a class="heading__anchor" href="#' +
    id +
    '" aria-hidden="true"><span></span></a>' +
    text +
    '</h' +
    level +
    '>\n';
};

module.exports = renderer;
