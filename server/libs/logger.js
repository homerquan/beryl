const config = require('../config/env');
const winston = require('winston');

//Use customer logger later
var Logger = new(winston.Logger)({
	level: config.logLvl,
	transports: [
		new(winston.transports.Console)({
			colorize: true,
			timestamp: true
		})
	]
});

module.exports = Logger;