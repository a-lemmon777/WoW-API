/**
 * Created by a.lemmon777 on 4/1/2015.
 */

var express = require('express');
var controller = require('./about.controller');
var router = express.Router();

// Routing for {my-service-url}/about
router.get('/', controller.getAboutInfo);

module.exports = router;