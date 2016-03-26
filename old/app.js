//var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nodejs_test');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var list_invoice = require('./invoice_route.js')(app);

/*
http.createServer(function(request, response)
{
    // resposnse.writeHead({
    //     'Content-Type': 'text/plain'
    // });
    // resposnse.end('hello world.');
    response.writeHead({
    	'Content-Type': 'application/json'
    });

var json = JSON.stringify({ 
    	'id': 1,
    	'name': 'eric'
  });
  response.end(json);

}).listen(8080);*/

var server = app.listen(8080, function(){
	console.log('App listening on port 8080!');
});