import {Component} from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http';
import {restApi} from './config';

@Component({
    selector: 'signup',
    templateUrl: 'templates/signup.component.html'
})

export class SignUpComponent {
    public username: string;
    public password: string;
    public passwordrepeat: string;

    constructor(private http: Http){
        this.username = '';
        this.password = '';
        this.passwordrepeat = '';
    }

    public signup(): void {
        if (this.username == '' || this.password == '' || this.passwordrepeat == '' || this.password != this.passwordrepeat) {
            return;
        }

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        this.http.post(restApi + '/user', JSON.stringify({username: this.username, password: this.password}), options)
            .toPromise().then((data) => {
            console.log('sikeres regisztráció: ' + data.json().id);
        }).catch(err => {
            console.log('hiba: ' + err.status);
        });
    }
}