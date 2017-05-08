import {Message} from "./Message";
import {Http, RequestOptions, Headers} from '@angular/http';
import {restApi} from './config';
import {AuthenticationService} from './auth.service';
import {Injectable} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';

@Injectable()
export class  MessageService {
    private messages: Message[] = [
    ];

    constructor(private http: Http, private auth: AuthenticationService, private authHttp: AuthHttp) {
        // this.messages.push(new Message(1, "Új regisztráció", "Teszt Elek", "2017-01-02", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"));
        // this.messages.push(new Message(2, "Meghívó", "Tóth Zoltán", "2015-11-23", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"));
        // TODO: lekérni a szerverről az üzeneteket
        this.pullMessages();
    }


    getMessages() {
        this.messages = [];
        this.pullMessages();
        return this.messages;
    }

    getMessage(id: number) {
        this.getMessages();

        for (let i = 0, iLen = this.messages.length; i < iLen; i++) {
            if (this.messages[i].id == id) {
                return this.messages[i];
            }
        }
        return null;
    }

    public pullMessages() {
        if (!this.auth.loggedIn()) {
            return;
        }
        this.authHttp.get(restApi + '/message').toPromise()
            .then((data) => {
                let msgData = data.json();
                this.messages.push(new Message(msgData.title, msgData.body, false, msgData.id, msgData.sender, msgData.date));
            }).catch((err) => {
            console.log(err.status);
        });
    }

    add(msg: Message) {
        this.messages.push(msg);
    }

    sendMessage(msg: Message) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(restApi + '/message', JSON.stringify(msg.getJson()), options)
            .toPromise().then((data) => {
                return true;
        }).catch((err) => {
            console.log('hiba: ' + err.status);
            return false;
        });
    }
}