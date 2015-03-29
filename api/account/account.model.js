/**
 * Created by a.lemmon777 on 3/28/2015.
 */
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AccountSchema = new Schema({
    //account_id: Number,
    account_name: String//,
    //"characters":
});

module.exports = mongoose.model('Account', AccountSchema);