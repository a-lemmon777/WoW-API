/**
 * Created by a.lemmon777 on 3/29/2015.
 */
'use strict';

var express = require('express');
var controller = require('./home.controller');
var router = express.Router();

// Routing for {my-service-url}
router.get('/', controller.displayGreeting);

module.exports = router;