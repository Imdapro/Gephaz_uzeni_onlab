import {Message} from "./Message";
import {Http, RequestOptions, Headers, URLSearchParams} from '@angular/http';
import {restApi} from './config';
import {AuthenticationService} from './auth.service';
import {Injectable} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';

@Injectable()
export class  MessageService {
    private messages: Message[] = [
    ];

    constructor(private http: Http, private auth: AuthenticationService, private authHttp: AuthHttp) {
    }

    /*
     * Kiüríti az üzenet tömböt, majd meghívja a feltöltő függvényt
     */
    getMessages(): Promise<Array<Message>> {
        this.messages = [];
        return this.pullMessages();
    }

    /*
     * A megadott id-jű
     */
    getMessage(id: number): Promise<Message> {
        return new Promise(resolve => {
            this.getMessages().then((data) => {
               resolve(data[id]);
            });
        }).then((data) => {
            return data;
        });
    }

    public pullMessages(): Promise<Array<Message>> {
        if (!this.auth.loggedIn()) {
            return;
        }
        return this.authHttp.get(restApi + '/message').toPromise()
            .then((data) => {
                let msgData = data.json();
                return new Promise<Array<Message>>(resolve => {
                    for (let i = 0; i < msgData.length; i++) {
                        this.authHttp.get(restApi + '/user/' + msgData[i].sender).toPromise().then((user) => {
                            // Magyarországon használt formátumra konvertáljuk a dátumot
                            let tmp = new Date(msgData[i].date).toISOString();
                            let date = tmp.split('T')[0].replace (new RegExp('-', 'g'), '.') + '. ' + tmp.split('T')[1].substr(0, 8);

                            this.messages.push(
                                new Message(msgData[i].title, msgData[i].body, false,
                                    i, user.json().username, date));
                            if (i === msgData.length - 1) {
                                resolve(this.messages);
                            }
                        });
                    }
                });
        });
    }

    add(msg: Message) {
        this.messages.push(msg);
    }

    sendMessage(msg: Message) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.authHttp.post(restApi + '/message', JSON.stringify(msg.getJson()), options)
            .toPromise().then((data) => {
                return true;
        }).catch((err) => {
            console.log('hiba: ' + err.status);
            return false;
        });
    }
}