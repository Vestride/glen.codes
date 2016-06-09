'use strict';

const path = require('path');
const root = require('app-root-path').path;
const argv = require('yargs').argv;

const dist = 'build';

module.exports = {
  root: root,
  dist: path.join(root, dist),
  assets: path.join(root, 'assets'),
  distAssets: path.join(root, dist, 'assets'),
  topLevel: path.join(root, 'top-level'),
  isProduction: !!process.env.PORT || !!argv.production,
  port: process.env.PORT || 8888,
};
