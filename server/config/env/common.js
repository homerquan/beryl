'use strict';

//shared setting 
exports = module.exports = {
	env: process.env.NODE_ENV,
	debugMode: false,
	siteTitle: 'convospot-widget',
	socketVersion: '1.4.8',  //use socket server's socket.io version here
	socketNamespace: '/convospot-widget-v2',
	socketPath: '/socket.io-client',
	cacheExpiration: 7200,
	application: process.env.npm_package_title,
	version: process.env.npm_package_version
};