/**
 * Created by a.lemmon777 on 3/28/2015.
 */
'use strict';

var Account = require('./account.model');

exports.createAccount = function(request, response) {
    var newAccount = new Account();
    newAccount.account_name = request.body.name;
    newAccount.save(function(err, account) {
        if (err) { return handleError(response, err); }
        console.log("Added a new account!");
        return response.status(200).json(newAccount);
    });
};

function handleError(response, err) {
    return response.send(500, err);
}