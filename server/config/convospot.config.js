// serving convospot.js with server settings
const $ = require('../libs/dollar').$;
const fs = require('fs');
const path = require('path');

module.exports = function(app, config) {
    fs.readFile(path.join('app/','convospot.nb.js'), 'utf8', function(err, text) {
        if (err) throw err;
        // Server config with env setting
        var textWithConfig = $('util').replaceConfig(text,config);
        app.get('/convospot.js', function(req, res) {
            res.send(textWithConfig);
        });
    });
};
