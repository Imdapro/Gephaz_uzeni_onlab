import {Component} from '@angular/core';
import {MessageService} from './message.service';
import {Message} from './Message';
import {AuthHttp} from 'angular2-jwt';
import {restApi} from './config';
import {RequestOptions, URLSearchParams} from '@angular/http';

@Component({
    selector: 'new-message',
    templateUrl: 'templates/new-message.component.html'
})

export class NewMessageComponent {
    public body: string;
    public title: string;
    public broadcast: boolean;
    public recipients: string;

    constructor(private msgService: MessageService, private authHttp: AuthHttp) {
        this.body = '';
        this.title = '';
        this.broadcast = false;
        this.recipients = '';
    }

    public send() {
        let recipientList = this.recipients.split(',');
        let msg = new Message(this.title, this.body, this.broadcast);

        let recipients: Array<string> = [];
        for (let i = 0; i < recipientList.length; i++) {
            console.log(recipientList[i]);
            let param: URLSearchParams = new URLSearchParams();
            param.set('username', recipientList[i]);
            let requestOptions = new RequestOptions();
            requestOptions.search = param;

            this.authHttp.get(restApi + '/user', { search: param }).toPromise()
                .then((data) => {
                    recipients.push(data.json().id);
                });
        }
        msg.recipients = recipients;

        this.msgService.sendMessage(msg).then((data) => {
            if (data == true) {
                console.log('Sikeres küldés');
            } else {
                console.log('Sikertelen küldés');
            }
        });
    }
}
