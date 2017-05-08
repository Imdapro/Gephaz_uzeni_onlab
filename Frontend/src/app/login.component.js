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
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var auth_service_1 = require('./auth.service');
var router_1 = require('@angular/router');
var ng2_messages_service_1 = require('./ng2-messages/ng2-messages.service');
var LoginComponent = (function () {
    function LoginComponent(http, authService, router, msg) {
        this.authService = authService;
        this.router = router;
        this.msg = msg;
        this.username = '';
        this.password = '';
    }
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.authService.login(this.username, this.password).then(function (data) {
            if (data == true) {
                console.log('sikeres bejelentkezés');
                _this.router.navigate(['./messages']);
                _this.msg.success('Sikeres bejelentkezés');
            }
            else {
                console.log('sikertelen bejelentkezés');
                _this.msg.error('Sikertelen bejelentkezés');
            }
        }).catch(function () {
            console.log('sikertelen bejelentkezés');
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login',
            templateUrl: 'templates/login.component.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http, auth_service_1.AuthenticationService, router_1.Router, ng2_messages_service_1.MessagesService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map