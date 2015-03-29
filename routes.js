/**
 * Created by a.lemmon777 on 3/28/2015.
 */
'use strict';

module.exports = function(app) {

    // Routes
    app.use('/account', require('./api/account'));
};