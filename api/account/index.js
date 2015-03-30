/**
 * Created by a.lemmon777 on 3/28/2015.
 */
'use strict';

var express = require('express');
var controller = require('./account.controller');
var router = express.Router();

// Routing for account/
router.get('/', controller.getAllAccounts);
router.post('/', controller.createAccount);

module.exports = router;