import {Component} from '@angular/core';
import {MessageService} from './message.service';
import {Message} from './Message';

@Component({
    selector: 'new-message',
    templateUrl: 'templates/new-message.component.html'
})

export class NewMessageComponent {
    public body: string;
    public title: string;
    public broadcast: boolean;

    constructor(private msgService: MessageService) {
        this.body = '';
        this.title = '';
        this.broadcast = false;
    }

    public send() {
        let msg = new Message(this.title, this.body, this.broadcast);
        this.msgService.sendMessage(msg).then((data) => {
            if (data == true) {
                console.log('Sikeres küldés');
            } else {
                console.log('Sikertelen küldés');
            }
        });
    }
}
