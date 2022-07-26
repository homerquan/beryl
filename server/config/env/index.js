'use strict';

var path = require('path');
var _ = require('lodash');

function requiredProcessEnv(name) {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.assign(
  require('./common'),
  require('./' + process.env.NODE_ENV) || {});