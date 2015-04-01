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

AccountSchema.set('toObject', {
    transform: function(doc, ret, options) {
        ret.account_id = ret._id;
        // remove these fields before returning the result
        delete ret.__v;
        delete ret._id;
    }
});

AccountSchema.statics.toClient = function(account) {
    return account.toObject();
};

module.exports = mongoose.model('Account', AccountSchema);