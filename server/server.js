var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var requests = require( "./requests" );
var logger = require('./log.js')

var app = express();
app.use(bodyParser.json());

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
app.get('/', function (req, res) {
  res.send('Decision maker server is up and running...\n');
});

app.listen(PORT, HOST);

app.post('/food', function(req, res) {
  var latitude = req.body.latitude;
  var longitude = req.body.longitude;
  var price = req.body.price;
  var radius = req.body.radius;
  logger.info( "Received request with latitude = " + latitude + ", longitude = " + longitude + ", price = " + price + ", radius = " + radius );
  requests.explore(res, "food", latitude, longitude, price, radius );
});

app.post('/drinks', function(req, res) {
  var latitude = req.body.latitude;
  var longitude = req.body.longitude;
  var price = req.body.price;
  var radius = req.body.radius;
  logger.info( "Received request with latitude = " + latitude + ", longitude = " + longitude + ", price = " + price + ", radius = " + radius );
  requests.explore(res, "drinks", latitude, longitude, price, radius);
});

app.post('/cafe', function(req, res) {
  var latitude = req.body.latitude;
  var longitude = req.body.longitude;
  var price = req.body.price;
  var radius = req.body.radius;
  logger.info( "Received request with latitude = " + latitude + ", longitude = " + longitude + ", price = " + price + ", radius = " + radius );
  requests.explore(res, "cafe", latitude, longitude, price, radius);
});

app.post('/random', function(req, res) {
  var latitude = req.body.latitude;
  var longitude = req.body.longitude;
  var price = req.body.price;
  var radius = req.body.radius;
  logger.info( "Received request with latitude = " + latitude + ", longitude = " + longitude + ", price = " + price + ", radius = " + radius );
  requests.explore(res, "trending", latitude, longitude, price, radius);
});
