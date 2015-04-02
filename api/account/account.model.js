/**
 * Created by a.lemmon777 on 3/28/2015.
 */
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var characteristics = [
    {race: "Orc", faction: "Horde", class: ["Warrior", "Death Knight", "Mage"]},
    {race: "Tauren", faction: "Horde", class: ["Warrior", "Druid", "Death Knight", "Mage"]},
    {race: "Blood Elf", faction: "Horde", class: ["Druid", "Death Knight", "Mage"]},
    {race: "Human", faction: "Alliance", class: ["Warrior", "Death Knight", "Mage"]},
    {race: "Gnome", faction: "Alliance", class: ["Warrior", "Death Knight", "Mage"]},
    {race: "Worgen", faction: "Alliance", class: ["Warrior", "Druid", "Death Knight", "Mage"]}
];

var characterErrorMessage = "Please enter a(n) {PATH} for your character.";
var accountErrorMessage = "Please enter a(n) {PATH} for your account.";

var CharacterSchema = new Schema({
    name: {type: String, required: characterErrorMessage},
    race: {type: String, required: characterErrorMessage},
    class: {type: String, required: characterErrorMessage},
    faction: {type: String, required: characterErrorMessage},
    level: {type: Number, required: characterErrorMessage, min: 1, max: 85},
    active: {type: Boolean, required: characterErrorMessage, default: true}
});

function getRaceInfo(race) {
    var toReturn = null;
    var found = false;
    var index = 0;
    while (!found && index < characteristics.length) {
        if (race == characteristics[index].race) {
            found = true;
            toReturn = characteristics[index];
        }
        index++;
    }
    return toReturn;
}

CharacterSchema.pre('validate', true, function (next, done) {
    next();
    var raceInfo = getRaceInfo(this.race);
    if (raceInfo == null) {
        done(new Error("Please enter a valid race for your character."));
    } else {
        var found = false;
        var index = 0;
        while (!found && index < raceInfo.class.length) {
            if (this.class == raceInfo.class[index]) {
                found = true;
            }
            index++;
        }
        if (!found) {
            done(new Error("Please enter a valid class for your character."));
        } else {
            done();
        }
    }
});

CharacterSchema.pre('validate', true, function (next, done) {
    next();
    var raceInfo = getRaceInfo(this.race);
    if (raceInfo == null) {
        done(new Error("Please enter a valid race for your character."));
    } else {
        if (this.faction != raceInfo.faction) {
            done(new Error("Please enter a valid faction for your character."));
        } else {
            done();
        }
    }
});

CharacterSchema.set('toObject', {
    transform: function(doc, ret, options) {
        ret.character_id = ret._id;
        // remove these fields before returning the result
        delete ret._id;
    }
});

var AccountSchema = new Schema({
    account_name: {type: String, required: accountErrorMessage},
    characters: {type: [CharacterSchema], validate: hordeVsAllianceValidator},
    link: String
});

function hordeVsAllianceValidator(newCharacter) {
    // At least one must be 0
    return (this.allianceCount == 0 || this.hordeCount == 0);
}

AccountSchema.virtual('allianceCount').get(function () {
    var count = 0;
    for (var i = 0; i < this.characters.length; i++) {
        if (this.characters[i].faction == "Alliance" && this.characters[i].active) {
            count++;
        }
    }
    return count;
});

AccountSchema.virtual('hordeCount').get(function () {
    var count = 0;
    for (var i = 0; i < this.characters.length; i++) {
        if (this.characters[i].faction == "Horde" && this.characters[i].active) {
            count++;
        }
    }
    return count;
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