var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var requests = require( "./requests" );

var app = express();
app.use(bodyParser.json());

app.listen(3000, function () {
  console.log('Started up Decision Maker Server on port 3000!');
  requests.scheduleCrawl();
})

app.get('/', function (req, res) {
  res.send('Decision Maker booted up...')
})

app.get('/test', function(req, res) {
  requests.requestForKey(res, "test");
});

app.post('/food', function(req, res) {
  requests.requestForKey(res, "food");
});

app.post('/drinks', function(req, res) {
  requests.requestForKey(res, "drinks");
});

app.post('/cafe', function(req, res) {
  requests.requestForKey(res, "cafe");
});

app.post('/random', function(req, res) {
  requests.requestForKey(res, "random");
});
