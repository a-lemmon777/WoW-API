/**
 * Created by a.lemmon777 on 3/28/2015.
 */
 
'use strict';

var models = require('./account.model');
var Account = models.Account;
var Character = models.Character;

exports.createAccount = function(request, response) {
  var linkToAccount = getURL(request) + "/account/" + request.body.name;
  Account.create({account_name: request.body.name, link: linkToAccount}, function(err, account) {
    if (err) { return handleError(response, err); }
    return response.status(200).json(account.toObject());
  });
};

exports.deleteAccount = function(request, response) {
  var account_name = request.params.account_name;
  Account.findOneAndRemove({account_name: account_name}, function (err) {
    if (err) { return handleError(response, err); }
    return response.status(200).send();
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
    if (account === null) { return handleError(response, new Error("Account not found."));}
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

exports.deleteCharacter = function(request, response) {
  changeCharacterStatus(request, response, false);
};

exports.unDeleteCharacter = function(request, response) {
  changeCharacterStatus(request, response, true);
};

exports.getAllCharacters = function(request, response) {
  var account_name = request.params.account_name;
  Account.findOne({account_name: account_name}, function (err, account) {
    if (err) { return handleError(response, err); }
    if (account === null) { return handleError(response, new Error("Account not found."));}
    return response.status(200).json(account.toObject());
  });
};

function changeCharacterStatus(request, response, changeBool) {
  var account_name = request.params.account_name;
  var character_name = request.params.character_name;
  Account.findOne({account_name: account_name}, function (err, account) {
    if (err) { return handleError(response, err); }
    if (account === null) { return handleError(response, new Error("Account not found."));}
    var character = account.getCharacter(character_name);
    if (character === null) { return handleError(response, new Error("Character not found."));}
    character.active = changeBool;
    account.save(function (err) {
      if (err) { return handleError(response, err); }
      return response.status(200).send();
    });
  });
}

function getURL(request) {
  var appProtocol = request.get('x-forwarded-proto'); // usually http or https
  var protocolText = appProtocol ? appProtocol + "://" : ""; // empty in case of localhost
  return protocolText + request.get('host');
}

function handleError(response, err) {
  return response.status(500).send(err);
}
