/**
 *
 * Global variable for telepathy
 * Using this to concertrate all global vars and functions
 * For performance, only put most neccessary GLOBAL vars here
 *
 **/

const config = require('../config/env');
const winston = require('winston');

exports.all = {
	config: require('./config'),
	welcome: require('./welcome'),
	logger: require('./logger'),
	util: require('./util')
};