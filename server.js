var express = require('express');
var app = express();
var mongoose = require('mongoose');
var config = require('./config');
var bodyParser = require('body-parser');
var apiRoutes = require('./routes/api')

app.use(express.static('public'));
app.use(bodyParser.json());

app.use('/api', apiRoutes)


var runServer = function(callback) {
    
    mongoose.connect(config.DATABASE_URL, function(err) {
        
        if (err && callback) {
            return callback(err);
        }

        app.listen(config.PORT, function() {
            console.log('Listening on localhost:' + config.PORT);
            if (callback) {
                callback();
            }
        });
    });
};

if (require.main === module) {
    runServer(function(err) {
        if (err) {
            console.error(err);
        }
    });
};

exports.app = app;
exports.runServer = runServer;
