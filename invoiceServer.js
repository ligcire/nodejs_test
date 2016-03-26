var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();
var InvoiceHandler = require('./handlers/invoiceHandler');
var routes = require('./InvoiceRoutes');
var config = require('./config');

// var async = require('async');
// var redis = require('redis');
// var client = redis.createClient(6379, process.env.IP || '127.0.0.1');

var r = require('request').defaults({
    json: true
});

//var fs = require('fs');

//var expressLogFile = fs.createWriteStream('./logs/express.log', {flags: 'a'});

// Configuration
//app.use(express.logger({stream: expressLogFile}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//app.use(express.static(__dirname + '/public'));

/*app.configure('development', function(){
  //app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});
app.configure('production', function(){
  //app.use(express.errorHandler());
});*/





var handlers = {
    invoice: new InvoiceHandler()
};

function start() {


    console.log("Connecting to MongoDB...");
    mongoose.connect(config.db.mongodb);
    console.log("Successfully connected to MongoDB. Starting web server...");

    routes.setup(app, handlers);
    var port = process.env.PORT || 8080;
    app.listen(port);
    console.log("Express server listening on port %d in %s mode", port, app.settings.env);
    console.log("Successfully started web server. Waiting for incoming connections...");
}

start();
// *******************************************************
/*exports.start = start;
exports.app = app;*/


// async.parallel({
//         one: function(callback) {
//             setTimeout(function() {
//                 callAPI('one');
//                 callback(null, 1);
//             }, 200);
//         },
//         two: function(callback) {
//             setTimeout(function() {
//                 callAPI('two');
//                 callback(null, 2);
//             }, 100);
//         }
//     },
//     function(err, results) {
//         // results is now equals to: {one: 1, two: 2}
//         console.log(results);
//     });

// function callAPI(id) {
//     console.log(id + new Date().toLocaleString());
//     client.get('uniqueid', function(error, data) {
//         if (error) { throw error; };
//         if (data) {
//             console.log(id + '(from cache):' + data.length);
//             console.log(id + new Date().toLocaleString());
//         } else {
//             restCall(id);
//         }
//     });
// }

// function restCall(id) {
//     r({ uri: config.services.test_local }, function(error, response, body) {
//         if (error) {
//             console.log(error);
//             return;
//         };
//         if (!error && response.statusCode === 200) {
//             //console.log(body.data);
//             client.setex('uniqueid', 100, JSON.stringify(body.data), function(error) {
//                 if (error) { throw error; };
//             });
//             console.log(id + '(from db):' + body.data.length);
//             console.log(id + new Date().toLocaleString());
//         } else {
//             console.log(response.statusCode);
//         }
//     });
// }
// setTimeout(function() {
//     callAPI('three');
// }, 10000);
