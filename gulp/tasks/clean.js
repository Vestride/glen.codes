'use strict';

const del = require('del');
const config = require('../config');

// Remove build files.
module.exports = function () {
  return del(config.dist);
};
