'use strict';

var marked = require('marked');

var renderer = new marked.Renderer();

// Change the code method to output the same as Prism.js would.
renderer.code = function (code, lang, escaped) {
  code = this.options.highlight(code, lang);

  // e.g. "language-js"
  var langClass = lang ? this.options.langPrefix + lang : '';
  var open = '<div class="code-block"><pre class="' + langClass + '">' +
    '<code class="' + langClass + '">';
  var close = '</code></pre></div>';
  return open + code + close;
};

renderer.heading = function (text, level, raw) {
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
