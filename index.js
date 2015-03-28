/**
 * Created by a.lemmon777 on 3/28/2015.
 */
'use strict';

// Some base setup
var express = require('express');
var app = express();
app.set('port', (process.env.PORT || 5000));

app.get('/', function(request, response) {
   response.send("It's working!");
});

app.listen(app.get('port'), function() {
    console.log("API is running on port " + app.get('port'));
});