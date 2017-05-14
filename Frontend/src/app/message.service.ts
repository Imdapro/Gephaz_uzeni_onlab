import {Message} from "./Message";
import {Http, RequestOptions, Headers, URLSearchParams, Response} from '@angular/http';
import {restApi} from './config';
import {AuthenticationService} from './auth.service';
import {Injectable} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class  MessageService {
    private messages: Array<Message>;
    private oldMessages: Array<Message>;
    private isFirst: boolean;

    constructor(private http: Http, private auth: AuthenticationService, private authHttp: AuthHttp) {
        this.isFirst = true;
        this.messages = [];
        this.oldMessages = [];
        this.getMessages().then((data) => this.oldMessages = data).catch(() => console.log('Hiba az üzenet lekérésnél!'));
        this.oldMessages = this.messages;
    }

    /*
     * Kiüríti az üzenet tömböt, majd meghívja a feltöltő függvényt
     */
    getMessages(): Promise<Array<Message>> {
        this.messages = [];
        return this.pullMessages();
    }

    /*
     * A megadott id-jű üzenettel tér vissza
     */
    getMessage(id: number): Promise<Message> {
        return new Promise((resolve) => {
            this.getMessages().then((data) => {
               resolve(data[id]);
            }).catch((err) => {
                Promise.reject(err);
            });
        }).then((data) => {
            return data;
        }).catch((err) => {
            Promise.reject(err);
        });
    }

    /*
     * Lekéri az összes üzenetet a szereverről. A lekért üzenetekhez
     * lekéri a feladók felhasználónevét, mivel a user id-jüket kapjuk meg alapból.
     */
    public pullMessages(): Promise<Array<Message>> {
        if (!this.auth.loggedIn()) {
            return Promise.reject(this.messages);
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
        }).catch((err) => {
                Promise.reject(err);
        });
    }

    add(msg: Message) {
        this.messages.push(msg);
    }

    /*
     * A paraméterül kapott üzenetet elküldi.
     */
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

    /*
     * 5 sec-enként pollozza a szervert, lekéri az üzeneteket, megvizsgálja, hogy van-e új üzenet, ha van akkor visszaadja
     */
    poll() {
        return Observable.interval(5000).switchMap(() => Observable.fromPromise(this.getMessages()).map((res) => {
            if (res === null) {
                this.oldMessages = this.messages;
                return Observable.throw(null);
            }

            if (this.oldMessages.length === this.messages.length) {
                // console.log(this.oldMessages.length + '' + this.messages.length);
                return;
            } else {
                for (let i = 0; i < this.messages.length; i++) {
                    let found = false;
                    for (let j = 0; j < this.oldMessages.length; j++) {
                        if (this.messages[i].title === this.oldMessages[j].title && this.messages[i].body === this.oldMessages[j].body &&
                            this.messages[i].date === this.oldMessages[j].date) {
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        this.oldMessages = this.messages;
                        if (this.isFirst) {
                            this.isFirst = false;
                        } else {
                            // if (this.messages[i].broadcast) {
                                return this.messages[i];
                            // }
                        }
                    }
                }
            }
        }));
    }
}
