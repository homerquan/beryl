/**
 * Main application file
 * convospot widget
 */

"use strict";

const $ = require("./libs/dollar").$;
const express = require("express");
const http = require("http");
const cors = require("cors");
const fs = require("fs");

require("./libs/all_loader").loadDollar();

// Setup server
var app = express();

app.use(cors());
app.use(express.static("app"));
require("./config/convospot.config")(app, $("config"));
require("./config/spinel.config")(app, $("config"));
var server = http.createServer(app);

// Start server
function startServer() {
	server.listen($("config").port, $("config").ip, function() {
		$("welcome")();
		console.log(
			"Express server listening on %s:%d, in %s mode",
			$('config').ip,
			$('config').port,
			app.get('env')
		);
	});
}

setImmediate(startServer);

// Expose app
exports = module.exports = app;
