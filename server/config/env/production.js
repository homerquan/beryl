'use strict';

// Production specific configuration
// =================================
module.exports = {
  // Server IP
  ip: process.env.OPENSHIFT_NODEJS_IP ||
    process.env.IP ||
    undefined,

  // Server port
  port: process.env.OPENSHIFT_NODEJS_PORT ||
    process.env.PORT ||
    80,

  widgetUrl: 'http://widget.convospot.io',

  socketUrl: 'http://app.convospot.io',

  socketNamespace: '/convospot-widget-v2',

  apiUrl: 'http://app.convospot.io/api/v2/',

  logLvl: 'error',

  coresWhitelist: ['http://app.convospot.io', 'http://widget.convospot.io']
};