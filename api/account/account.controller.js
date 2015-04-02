/**
 * Created by a.lemmon777 on 3/28/2015.
 */
'use strict';

var models = require('./account.model');
var Account = models.Account;
var Character = models.Character;

exports.createAccount = function(request, response) {
    //console.log(request.protocol);
    //console.log(request.get('x-forwarded-proto'));
    //console.log(request.get('host'));
    //var appProtocol = request.get('x-forwarded-proto'); // usually http or https
    //var protocolText = appProtocol ? appProtocol + "://" : "";
    //console.log(protocolText + request.get('host'));
    var linkToAccount = getURL(request) + "/account/" + request.body.name;
    Account.create({account_name: request.body.name, link: linkToAccount}, function(err, account) {
        if (err) { return handleError(response, err); }
        return response.status(200).json(account.toObject());
    });
};

exports.getAllAccounts = function(request, response) {
    var returnBody = {accounts: []};
    Account.find({}, function (err, accounts) {
        if (err) { return handleError(response, err); }
        returnBody.accounts = accounts.map(Account.toClient); // Changes all accounts to a client-friendly view
        return response.status(200).json(returnBody);
    });
};

exports.createCharacter = function(request, response) {
    var account_name = request.params.account_name;
    Account.findOne({account_name: account_name}, function(err, account) {
        if (err) { return handleError(response, err); }
        var newCharacter = new Character({
            name: request.body.name,
            race: request.body.race,
            class: request.body.class,
            faction: request.body.faction,
            level: request.body.level
        });
        account.characters.push(newCharacter);
        account.save(function(err) {
            if (err) { return handleError(response, err); }
            return response.status(200).json(newCharacter.toObject());
        });
    });
};

exports.deleteAccount = function(request, response) {
    var account_name = request.params.account_name;
    Account.findOneAndRemove({account_name: account_name}, function (err) {
        if (err) { return handleError(response, err); }
        return response.status(200).send();
    });
};

exports.getAllCharacters = function(request, response) {
    var account_name = request.params.account_name;
    //var returnBody = {accounts: []};
    Account.findOne({account_name: account_name}, function (err, account) {
        if (err) { return handleError(response, err); }
        //returnBody.accounts = accounts.map(Account.toClient); // Changes all accounts to a client-friendly view
        return response.status(200).json(account.toObject());
    });
};

function getURL(request) {
    var appProtocol = request.get('x-forwarded-proto'); // usually http or https
    var protocolText = appProtocol ? appProtocol + "://" : ""; // empty in case of localhost
    return protocolText + request.get('host');
}

function handleError(response, err) {
    return response.send(500, err);
}