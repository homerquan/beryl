// serving config with server settings
const $ = require('../libs/dollar').$;
const fs = require('fs');
const path = require('path');

module.exports = function(app, config) {
    fs.readFile(path.join('app/elements/core/','config.nb.html'), 'utf8', function(err, text) {
        if (err) throw err;
        // Server config with env setting
        var textWithConfig = $('util').replaceConfig(text,config);
        app.get('/elements/core/config.html', function(req, res) {
            res.send(textWithConfig);
        });
    });
};
