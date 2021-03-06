import {Component} from '@angular/core';
import {MessageService} from './message.service';
import {Message} from './Message';
import {AuthHttp} from 'angular2-jwt';
import {restApi} from './config';
import {RequestOptions, URLSearchParams} from '@angular/http';
import {MessagesService} from './ng2-messages/ng2-messages.service';

@Component({
    selector: 'new-message',
    templateUrl: 'templates/new-message.component.html'
})

export class NewMessageComponent {
    public body: string;
    public title: string;
    public broadcast: boolean;
    public recipients: string;

    constructor(private msgService: MessageService, private authHttp: AuthHttp, private alertMsg: MessagesService) {
        this.body = '';
        this.title = '';
        this.broadcast = false;
        this.recipients = '';
    }

    public getRecipientIds(recipientList: Array<string>, recipients: Array<string>, i: number): Promise<Array<string>> {
        if (i >= recipientList.length) {
            return new Promise(resolve => {
                resolve(recipients);
            }).then((rec) => {
                return rec;
            });
        }
        console.log(recipientList[i]);
        let param: URLSearchParams = new URLSearchParams();
        param.set('username', recipientList[i]);
        let requestOptions = new RequestOptions();
        requestOptions.search = param;

        return this.authHttp.get(restApi + '/user', { search: param }).toPromise()
            .then((data) => {
                if (data != null && data.json().id) {
                    recipients.push(data.json().id);
                }
                return this.getRecipientIds(recipientList, recipients, i + 1);
            }).catch((data) => {
                this.alertMsg.error('Nem létezik ilyen felhasználó!');
            });
    }

    public send() {
        let recipientList = this.recipients.split(',');
        let msg = new Message(this.title, this.body, this.broadcast);

        let recipients: Array<string> = [];
        if (this.broadcast) {
            this.pushToService(msg);
        } else {
            this.getRecipientIds(recipientList, recipients, 0).then((recip) => {
                if (recip && recip.length !== 0) {
                    msg.recipients = recip;
                }
                this.pushToService(msg);
            });
        }
    }

    public pushToService(msg: Message) {
        this.msgService.sendMessage(msg).then((data) => {
            if (data == true) {
                console.log('Sikeres küldés');
            } else {
                console.log('Sikertelen küldés');
            }
        });
    }

    onCheck() {
        this.broadcast = !this.broadcast;
        console.log(this.broadcast);
    }
}
