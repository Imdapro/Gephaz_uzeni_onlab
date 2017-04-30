"use strict";
var angular2_jwt_1 = require('angular2-jwt');
function loggedIn() {
    return angular2_jwt_1.tokenNotExpired();
}
exports.loggedIn = loggedIn;
//# sourceMappingURL=auth.service.js.map