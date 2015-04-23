---
title: Using Prism with Metalsmith and Markdown
collection: posts
published: 2015-04-22
template: post.swig
---

This site is built on [Metalsmith](http://www.metalsmith.io/). I write posts in markdown and use [metalsmith-markdown](https://github.com/segmentio/metalsmith-markdown) (which is a wrapper for [marked](https://github.com/chjj/marked)) to convert them to static html. By default, code blocks in marked are only put inside a `<pre><code></code></pre>` block without any syntax highlighting. I, and many others, love using [Prism](http://prismjs.com/) to highlight code and I wanted to use it with marked.

Here's a basic setup for metalsmith which only converts markdown files.

```js
var metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');

metalsmith(__dirname)
  .use(markdown())
  .build(function(err) {
    if (err) {
      throw err;
    }
  });
```
## The `highlight` option

Marked allows us to highlight the code blocks with the `highlight` option. Prism has a `prism.highlight(str, grammar)` method which we will use. The `str` parameter is the code and `grammar` is a language object which can be found on `prism.languages`. JavaScript's grammar object, for example, is `prism.languages.javascript`.

```js
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

var markdownOptions = {
  highlight: function(code, lang) {
    if (!prism.languages.hasOwnProperty(lang)) {
      // Default to markup if it's not in our extensions.
      lang = extensions[lang] || 'markup';
    }

    return prism.highlight(code, prism.languages[lang]);
  }
};

// Convert the markdown files.
metalsmith(__dirname)
  .use(markdown(markdownOptions))
  .build();
```

In the highlight method, we are given `code` and `lang` parameters. The former is the string of code from your code block and the latter is the language you specified. Prism doesn't have any aliases in its `languages` array, so we need to point a few common ones to their correct values. We then get the highlighted code from prism and return that to marked.

## Customizing the renderer

It's almost done at this point, but prism's css classes expect a slightly different structure than what we have. We want to override the default `code` method in the marked renderer to create the html tags in the same way prism would generate them with a class name on both the `<pre>` and `<code>` elements.

```js
var marked = require('marked');
var renderer = new marked.Renderer();

// Change the code method to output the same as Prism.js would.
renderer.code = function(code, lang, escaped) {
  code = this.options.highlight(code, lang);

  if (!lang) {
    return '<pre><code>' + code + '</code></pre>';
  }

  // e.g. "language-js"
  var langClass = this.options.langPrefix + lang;

  return '<pre class="' + langClass + '"><code class="' + langClass + '">' +
    code +
    '</code></pre>';
};

var markdownOptions = {
  renderer: renderer,
  langPrefix: 'language-',
  highlight: function(code, lang) { /* highlight method*/ }
};
```

## Putting it all together

This is what I am currently using to render markdown with prism.

```js
var metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var marked = require('marked');
var prism = require('prismjs');

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

gulp.task('posts', function(done) {
  metalsmith(__dirname)
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
    .build(function(err) {
      if (err) {
        throw err;
      }
    });
});
```

## Wrapping up

You can take a look at the whole file on [GitHub](https://github.com/Vestride/glen.codes/blob/master/gulp/metal.js).
