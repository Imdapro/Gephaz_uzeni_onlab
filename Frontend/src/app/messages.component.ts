import {Component} from '@angular/core'
import {MessageService} from "./message.service";
import {Message} from "./Message";
import {Router} from "@angular/router";

@Component({
    selector: 'messages',
    templateUrl: 'templates/messages.component.html',
    providers: [ MessageService ]
})

export class MessagesComponent {
    messages: Message[];

    constructor(private msgService: MessageService, private router: Router) {
        this.messages = msgService.getMessages();
    }
}