/**
 * Created by a.lemmon777 on 3/28/2015.
 */
 
'use strict';

// Setting up express
var express = require('express');
var app = express();
app.set('port', (process.env.PORT || 5000));

// Setting up database
var mongoose = require('mongoose');
mongoose.connect('mongodb://devUser:devPass@ds045531.mongolab.com:45531/heroku_app35323377'); // uses temporary credentials

// Parsing tools for all the incoming data formats I could think of.
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({'extended': true})); // For parsing application/x-www-form-urlencoded format
app.use(bodyParser.json({'type': ['json', 'js', 'text/*']})); // For parsing json, javascript, and text formats
var multer = require('multer');
app.use(multer({dest: './uploads/'})); // For parsing multipart/form-data, would put any received files in the uploads directory

// Register routes
require('./routes')(app);

// Begin listening
app.listen(app.get('port'), function() {
  console.log('API is running on port ' + app.get('port'));
});

module.exports = app;
