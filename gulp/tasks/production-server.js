'use strict';

const connect = require('connect');
const serveStatic = require('serve-static');
const redirect = require('redirecter');
const compression = require('compression');
const config = require('../config');

module.exports = function () {
  var app = connect();

  // Redirect requests to herokuapp.com to custom domain.
  app.use(function handleRequest(req, res, next) {
    if (req.headers.host === 'glencodes.herokuapp.com') {
      redirect(req, res, {
        target: 'https://glen.codes' + req.url,
        statusCode: 301,
      });
    } else {
      next();
    }
  });

  app.use(compression());

  // Serve from /build
  app.use(serveStatic(config.dist, {
    maxAge: '2 weeks',
    setHeaders: function setCustomCacheControl(res, path) {
      var mime = serveStatic.mime.lookup(path);
      var age = 1209600;

      if (mime === 'text/html') {
        age = 0;
      }

      res.setHeader('Cache-Control', 'public, max-age=' + age);
    },
  }));

  app.listen(config.port);
  console.log(`Serving from ${config.dist}`);
  console.log(`App listening on port ${config.port}`);
};
