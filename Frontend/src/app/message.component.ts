import {Component} from "@angular/core";
import {MessageService} from "./message.service";
import {Message} from "./Message";
import {ActivatedRoute, Router} from "@angular/router";
import {MessagesService} from './ng2-messages/ng2-messages.service';

@Component({
    selector: 'message',
    templateUrl: '/templates/message.component.html',
    providers: [ MessageService ]
})

export class MessageComponent {
    public message: Message;

    constructor(private msgService: MessageService, private route: ActivatedRoute, private router: Router, private alertMsg: MessagesService) {
    }

    ngOnInit() {
        this.message = new Message();
        this.msgService.getMessage(this.route.snapshot.params['id']).then((data) => {
            this.message = data;
        }).catch((err) => console.log('Hiba történt az üzenetek lekérése közben!'));
    }
}