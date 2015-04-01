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

if (!AccountSchema.options.toObject) AccountSchema.options.toObject = {}; // Make an options object if there isn't one
AccountSchema.options.toObject.transform = function(doc, ret, options) {
    // remove these fields before returning the result
    delete ret.__v;
};

//AccountSchema.statics.getAllAccounts = function(callback) {
//    this.find().exec(function(err, accounts) {
//        var transformedAccounts = accounts.map(AccountSchema.toClient);
//        callback;
//        return transformedAccounts;
//    });
//};

AccountSchema.statics.toClient = function(account) {
    return account.toObject();
};



module.exports = mongoose.model('Account', AccountSchema);