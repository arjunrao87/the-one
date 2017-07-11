require('dotenv').config()
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var requests = require( "./requests" );
var logger = require('./log.js')
var nodemailer = require('nodemailer');

var app = express();
app.use(bodyParser.json());

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
app.get('/', function (req, res) {
  res.send('Decision maker server is up and running...\n' );
});

app.listen(PORT, HOST);

//------------------- Defining routes -------------------//

app.post('/metrics', function(req, res) {
  var latitude = req.body.latitude;
  var longitude = req.body.longitude;
  var os = req.body.os;
  var osVersion = req.body.osVersion;
  var date = req.body.date;
  var offset = req.body.offset;
  logger.info( "Received User Info ==> Latitude  = " + latitude + ", longitude = " + longitude + ", os = " + os + ", osVersion = " + osVersion + ", date = " + date + ", offset = " + offset );
});

app.post('/feedback', function(req, res) {
  var text = req.body.text;
  logger.info( "Received User Feedback ==> " + text );
  var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD
        }
    });
  var mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: process.env.EMAIL_ADDRESS,
    subject: 'User Feedback - The One', // Subject line
    text: text
  };
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          console.log(error);
          res.json({yo: 'error'});
      }else{
          console.log('Message sent: ' + info.response);
          res.json({yo: info.response});
      };
  });
});

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
