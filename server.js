/**
 * Created by a.lemmon777 on 3/26/2015.
 */
"use strict";
var express = require("express");
var app = express();
var bodyParser = require("body-parser");

// bodyParser will let us get data from a POST request
app.use(bodyParser.urlencoded({"extended": true})); // why true?
app.use(bodyParser.json());

var port = 9000;

var mongoose = require("mongoose");

// Routes
var router = express.Router();

// test rout
router.get("/", function(req, res) { //put this in a controller
    res.json({"message": "Hello!"});
});

// register the routes
app.use("/api", router);

// Start the server
app.listen(port);
console.log("Server listening on port " + port);

