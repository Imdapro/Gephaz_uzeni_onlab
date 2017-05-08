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
var auth_service_1 = require('./auth.service');
var router_1 = require('@angular/router');
var AppComponent /* implements OnInit, OnDestroy*/ = (function () {
    function AppComponent /* implements OnInit, OnDestroy*/(auth, router) {
        this.auth = auth;
        this.router = router;
        this.auth.logout();
    }
    // public messages: Array<any>;
    // public isShown: boolean;
    // public shownMsg: string;
    //
    // constructor(private socket: WebSocketService, private msgService: MessageService) {
    //     this.messages = [];
    //     this.isShown = false;
    //     this.shownMsg = 'teszt';
    // }
    //
    // ngOnInit(): void {
    //     this.socket.getEventListener().subscribe(event => {
    //         if (event.type == 'message') {
    //             let data = event.data.content;
    //             if(event.data.sender) {
    //                 data = event.data.sender + ': ' + data;
    //             }
    //             this.shownMsg = data;
    //             this.isShown = true;
    //             // TODO
    //             //this.msgService.add(data);
    //         }
    //         // if (event.type == "close") {
    //         //     this.messages.push("/The socket connection has been closed");
    //         // }
    //         // if (event.type == "open") {
    //         //     this.messages.push("/The socket connection has been established");
    //         // }
    //     });
    // }
    //
    // send(): void {
    //     this.socket.send('');
    // }
    //
    // ngOnDestroy(): void {
    //     this.socket.close();
    // }
    //
    // hideMessage(): void {
    //     this.isShown = false;
    // }
    AppComponent /* implements OnInit, OnDestroy*/.prototype.logout = function () {
        this.auth.logout();
        this.router.navigate(['./']);
    };
    AppComponent /* implements OnInit, OnDestroy*/ = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: 'templates/app.component.html'
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthenticationService, router_1.Router])
    ], AppComponent /* implements OnInit, OnDestroy*/);
    return AppComponent /* implements OnInit, OnDestroy*/;
}());
exports.AppComponent /* implements OnInit, OnDestroy*/ = AppComponent /* implements OnInit, OnDestroy*/;
//# sourceMappingURL=app.component.js.map