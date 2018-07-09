'use strict';

// Production specific configuration
// =================================
module.exports = {
  port: 8805,
  ip: '0.0.0.0',
  debugMode: false,
  widgetUrl: 'https://widget.reflen.com',
  socketUrl: 'https://socket.reflen.com',
  apiUrl: 'https://api.reflen.com/v2',
  cert:'/etc/letsencrypt/live/widget.reflen.com/fullchain.pem';
  key:'/etc/letsencrypt/live/widget.reflen.com/privkey.pem';
};