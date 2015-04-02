/**
 * Created by a.lemmon777 on 3/28/2015.
 */
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CharacterSchema = new Schema({
    name: String,
    race: String,
    class: String,
    faction: String,
    level: Number
});

CharacterSchema.set('toObject', {
    transform: function(doc, ret, options) {
        ret.character_id = ret._id;
        // remove these fields before returning the result
        //delete ret.__v;
        delete ret._id;
    }
});

var AccountSchema = new Schema({
    account_name: String,
    characters: [CharacterSchema]
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


var Account = mongoose.model('Account', AccountSchema);
var Character = mongoose.model('Character', CharacterSchema);
module.exports = {
    Account: Account,
    Character: Character
};