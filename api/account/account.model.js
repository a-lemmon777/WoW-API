/**
 * Created by a.lemmon777 on 3/28/2015.
 */
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var races = ["Orc", "Tauren", "Blood Elf", "Human", "Gnome", "Worgen"];
var classes = ["Warrior", "Druid", "Death Knight", "Mage"];
var factions = ["Horde", "Alliance"];
var characterErrorMessage = "Please enter a {PATH} for your character.";
var accountErrorMessage = "Please enter a {PATH} for your account.";

var CharacterSchema = new Schema({
    name: {type: String, required: characterErrorMessage},
    race: {type: String, required: characterErrorMessage, enum: races},
    class: {type: String, required: characterErrorMessage, enum: classes},
    faction: {type: String, required: characterErrorMessage, enum: factions},
    level: {type: Number, required: characterErrorMessage, min: 1, max: 85},
    active: {type: Boolean, required: characterErrorMessage, default: true}
});

CharacterSchema.set('toObject', {
    transform: function(doc, ret, options) {
        ret.character_id = ret._id;
        // remove these fields before returning the result
        //delete ret.__v; There doesn't seem to be a __v?
        delete ret._id;
    }
});

var AccountSchema = new Schema({
    account_name: {type: String, required: accountErrorMessage},
    characters: [CharacterSchema],
    link: String
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

AccountSchema.methods.getCharacter = function(character_name) {
    for(var i = 0; i < this.characters.length; i++) {
        if (this.characters[i].name == character_name) {
            return this.characters[i];
        }
    }
    return null;
};


var Account = mongoose.model('Account', AccountSchema);
var Character = mongoose.model('Character', CharacterSchema);
module.exports = {
    Account: Account,
    Character: Character
};