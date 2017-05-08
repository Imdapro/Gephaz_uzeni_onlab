"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_jwt_1 = require('angular2-jwt');
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var config_1 = require('./config');
require('rxjs/add/operator/map');
var AuthenticationService = (function () {
    function AuthenticationService(http) {
        this.http = http;
        this.jwtHelper = new angular2_jwt_1.JwtHelper();
    }
    AuthenticationService.prototype.login = function (username, password) {
        var _this = this;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(config_1.restApi + '/auth', JSON.stringify({ username: username, password: password }), options)
            .toPromise().then(function (response) {
            var token = response.json() && response.json().token;
            if (token) {
                _this.token = token;
                localStorage.setItem('token', token);
                return true;
            }
            return false;
        }).catch(function (data) {
            return false;
        });
    };
    AuthenticationService.prototype.logout = function () {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('token');
    };
    AuthenticationService.prototype.loggedIn = function () {
        return angular2_jwt_1.tokenNotExpired();
    };
    AuthenticationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AuthenticationService);
    return AuthenticationService;
}());
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=auth.service.js.map