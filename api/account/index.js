/**
 * Created by a.lemmon777 on 3/28/2015.
 */
'use strict';

var express = require('express');
var controller = require('./account.controller');
var router = express.Router();

// Routing for {my-service-url}/account
router.get('/', controller.getAllAccounts);
router.post('/', controller.createAccount);
router.post('/:account_name/characters', controller.createCharacter);

module.exports = router;