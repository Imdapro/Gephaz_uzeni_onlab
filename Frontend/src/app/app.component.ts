import {Component, Directive, OnDestroy, OnInit} from '@angular/core';
import {WebSocketService} from './websocket.service';
// import {MessageService} from './message.service';
import {AuthenticationService} from './auth.service';
import {Router} from '@angular/router';
import {MessagesService} from './ng2-messages/ng2-messages.service';
import {MessagesComponent} from './ng2-messages/ng2-messages.component';


@Component({
    selector: 'my-app',
    templateUrl: 'templates/app.component.html',
})

@Directive({

})
export class AppComponent /* implements OnInit, OnDestroy*/ {
    constructor(public auth: AuthenticationService, private router: Router, public msg: MessagesService) {
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
    public logout() {
        this.auth.logout();
        this.router.navigate(['./']);
    }
}
