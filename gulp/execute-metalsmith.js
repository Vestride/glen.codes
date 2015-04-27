#!/usr/bin/env node

var argv = require('yargs').argv;

require('./metal')(!!argv.production);
