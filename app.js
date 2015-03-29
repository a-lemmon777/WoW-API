/**
 * Created by a.lemmon777 on 3/28/2015.
 */
'use strict';

// Some base setup
var express = require('express');
var mongoose = require('mongoose');

// Database connection uses temporary credentials
mongoose.connect('mongodb://devUser:devPass@ds045531.mongolab.com:45531/heroku_app35323377');
var app = express();

// Incoming data parsing
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({"extended": true})); // For parsing application/x-www-form-urlencoded format
app.use(bodyParser.json({"type": ["json", "js", "text/*"]})); // For parsing json, javascript, and text formats
var multer = require('multer');
// Would put any received files in the uploads directory
app.use(multer({dest: './uploads/'})); // For parsing multipart/form-data



//var Account = require('./api/account/account.model');
app.set('port', 5000);

//Routes
//var router = express.Router();
//
//router.get('/', function(request, response) {
//   response.json({message: "It's still working well!"});
//});

//// Middleware for all requests
//router.use(function(request, response, next) {
//    console.log("Got a request!");
//    next();
//});
//
//router.route('/account').post(function(request, response) {
//    var account = new Account();
//    console.log(request.body);
//    account.account_name = request.body.name;
//
//    account.save(function(err) {
//        if (err) {
//            response.send(err);
//        }
//        response.json(account);
//    });
//});

// Register routes
//app.use('/api', router);
require('./routes')(app);

// Begin listening
app.listen(app.get('port'), function() {
    console.log("API is running on port " + app.get('port'));
});