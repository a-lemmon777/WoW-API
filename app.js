/**
 * Created by a.lemmon777 on 3/28/2015.
 */
'use strict';

// Some base setup
var express = require('express');
var mongoose = require('mongoose');
var mongoURI = process.env.MONGO_URI || undefined;
mongoose.connect(mongoURI);
var app = express();
//var Account = require('./api/account/account.controller');
app.set('port', (process.env.PORT || 5000));

// Routes
//var router = express.Router();
//app.get('/', function(request, response) {
//   response.send("It's still working well!");
//});

require('./routes')(app);

// Begin listening
app.listen(app.get('port'), function() {
    console.log("API is running on port " + app.get('port'));
});