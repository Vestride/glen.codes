'use strict';

const connect = require('gulp-connect');
const config = require('../config');

// Run live reload server and watch for changes.
module.exports = function () {
  console.log(`Serving from ${config.dist}`);
  connect.server({
    root: config.dist,
    port: process.env.PORT || config.port,
    livereload: true,
  });
};
