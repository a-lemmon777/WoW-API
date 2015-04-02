/**
 * Created by a.lemmon777 on 3/28/2015.
 */
'use strict';

var models = require('./account.model');
var Account = models.Account;
var Character = models.Character;

exports.createAccount = function(request, response) {
    var newAccount = new Account();
    newAccount.account_name = request.body.name;
    newAccount.save(function(err, account) {
        if (err) { return handleError(response, err); }
        return response.status(200).json(newAccount.toObject());
    });
};

exports.getAllAccounts = function(request, response) {
    var returnBody = {accounts: []};
    Account.find().exec(function (err, accounts) {
        if (err) { return handleError(response, err); }
        returnBody.accounts = accounts.map(Account.toClient);
        return response.status(200).json(returnBody);
    });
};

exports.createCharacter = function(request, response) {
    var account_name = request.params.account_name;
    Account.findOne({account_name: account_name}, function(err, account) {
        if (err) { return handleError(response, err); }
        var newCharacter = new Character({
            name: request.body.name,
            race: request.body.race
        });
        account.characters.push(newCharacter);
        account.save(function(err) {
            if (err) { return handleError(response, err); }
            return response.status(200).json(newCharacter.toObject());
        });
    });
};

function handleError(response, err) {
    return response.send(500, err);
}