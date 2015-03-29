/**
 * Created by a.lemmon777 on 3/29/2015.
 */
'use strict';

exports.displayGreeting = function(request, response) {
    console.log("Welcome!");
    response.json({message: "Welcome to the WoW API!"});
    //var newAccount = new Account();
    //newAccount.account_name = request.body.name;
    //newAccount.save(function(err, account) {
    //    if (err) { return handleError(response, err); }
    //    console.log("Added a new account!");
    //    return response.status(200).json(newAccount);
    //});
};

//function handleError(response, err) {
//    return response.send(500, err);
//}