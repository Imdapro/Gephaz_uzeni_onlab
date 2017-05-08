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
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var app_component_1 = require('./app.component');
var app_routing_module_1 = require("./app-routing.module");
var login_component_1 = require("./login.component");
var messages_component_1 = require("./messages.component");
var message_service_1 = require("./message.service");
var message_component_1 = require("./message.component");
var auth_module_1 = require('./auth.module');
var websocket_service_1 = require('./websocket.service');
var auth_service_1 = require('./auth.service');
var signup_component_1 = require('./signup.component');
var angular2_jwt_1 = require('angular2-jwt');
var new_message_component_1 = require('./new-message.component');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                auth_module_1.AuthModule,
                forms_1.FormsModule,
                http_1.HttpModule
            ],
            providers: [
                message_service_1.MessageService,
                websocket_service_1.WebSocketService,
                auth_service_1.AuthenticationService,
                {
                    provide: angular2_jwt_1.AuthHttp,
                    useFactory: auth_module_1.authHttpServiceFactory,
                    deps: [http_1.Http, http_1.RequestOptions]
                }
            ],
            declarations: [
                app_component_1.AppComponent,
                login_component_1.LoginComponent,
                messages_component_1.MessagesComponent,
                message_component_1.MessageComponent,
                signup_component_1.SignUpComponent,
                new_message_component_1.NewMessageComponent
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map