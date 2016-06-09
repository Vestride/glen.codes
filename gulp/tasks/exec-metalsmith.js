'use strict';

const exec = require('child_process').exec;
const connect = require('gulp-connect');

// Run metalsmith without gulp. Otherwise any new templates will be ignored.
// Starting and stopping the server and the watch (gaze) processes still don't
// trigger metalsmith to use the new templates.
module.exports = function execMetalsmith(done) {
  exec('node gulp/execute-metalsmith.js', function () {
    connect.reload();
    done();
  });
};
