import {Component} from "@angular/core";
import {MessageService} from "./message.service";
import {Message} from "./Message";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'message',
    templateUrl: '/templates/message.component.html',
    providers: [ MessageService ]
})

export class MessageComponent{
    message: Message;

    constructor(private msgService: MessageService, private route: ActivatedRoute, private router: Router) {

    }

    ngOnInit(){
        this.message = this.msgService.getMessage(this.route.snapshot.params['id']);
    }
}