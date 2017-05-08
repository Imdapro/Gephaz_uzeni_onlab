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
var Message_1 = require("./Message");
var http_1 = require('@angular/http');
var config_1 = require('./config');
var auth_service_1 = require('./auth.service');
var core_1 = require('@angular/core');
var angular2_jwt_1 = require('angular2-jwt');
var MessageService = (function () {
    function MessageService(http, auth, authHttp) {
        this.http = http;
        this.auth = auth;
        this.authHttp = authHttp;
        this.messages = [];
        // this.messages.push(new Message(1, "Új regisztráció", "Teszt Elek", "2017-01-02", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"));
        // this.messages.push(new Message(2, "Meghívó", "Tóth Zoltán", "2015-11-23", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"));
        // TODO: lekérni a szerverről az üzeneteket
        this.pullMessages();
    }
    MessageService.prototype.getMessages = function () {
        this.messages = [];
        this.pullMessages();
        return this.messages;
    };
    MessageService.prototype.getMessage = function (id) {
        this.getMessages();
        for (var i = 0, iLen = this.messages.length; i < iLen; i++) {
            if (this.messages[i].id == id) {
                return this.messages[i];
            }
        }
        return null;
    };
    MessageService.prototype.pullMessages = function () {
        var _this = this;
        if (!this.auth.loggedIn()) {
            return;
        }
        this.authHttp.get(config_1.restApi + '/message').toPromise()
            .then(function (data) {
            var msgData = data.json();
            _this.messages.push(new Message_1.Message(msgData.title, msgData.body, false, msgData.id, msgData.sender, msgData.date));
        }).catch(function (err) {
            console.log(err.status);
        });
    };
    MessageService.prototype.add = function (msg) {
        this.messages.push(msg);
    };
    MessageService.prototype.sendMessage = function (msg) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(config_1.restApi + '/message', JSON.stringify(msg.getJson()), options)
            .toPromise().then(function (data) {
            return true;
        }).catch(function (err) {
            console.log('hiba: ' + err.status);
            return false;
        });
    };
    MessageService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, auth_service_1.AuthenticationService, angular2_jwt_1.AuthHttp])
    ], MessageService);
    return MessageService;
}());
exports.MessageService = MessageService;
//# sourceMappingURL=message.service.js.map