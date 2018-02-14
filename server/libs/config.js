//for overloading setting in /etc/appnamerc
const defaultConfig = require('../config/env');
const config = require('rc')(process.env.npm_package_name, defaultConfig);
module.exports = config;