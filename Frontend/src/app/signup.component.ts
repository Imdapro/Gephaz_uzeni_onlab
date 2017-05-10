import {Component} from '@angular/core';
import {Http, RequestOptions, Headers} from '@angular/http';
import {restApi} from './config';
import {Router} from '@angular/router';
import {MessagesService} from './ng2-messages/ng2-messages.service';

@Component({
    selector: 'signup',
    templateUrl: 'templates/signup.component.html'
})

export class SignUpComponent {
    public username: string;
    public password: string;
    public passwordrepeat: string;

    constructor(private http: Http, private router: Router, private msg: MessagesService) {
        this.username = '';
        this.password = '';
        this.passwordrepeat = '';
    }

    public signup(): void {
        /*
         * Ellenőrizzük, hogy minden mező ki van-e töltve, illetve, hogy megyegyezik-e a két megadott jelszó.
         */
        if (this.username == '' || this.password == '' || this.passwordrepeat == '' || this.password != this.passwordrepeat) {
            if (this.password != this.passwordrepeat){
                this.msg.error('A két megadott jelszó nem egyezik meg!');
            } else {
                this.msg.error('Minden mezőt ki kell tölteni!');
            }
            return;
        }

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        this.http.post(restApi + '/user', JSON.stringify({username: this.username, password: this.password}), options)
            .toPromise().then((data) => {
            this.msg.success('Sikeres regisztráció!');
            this.router.navigate(['./login']);
            console.log('sikeres regisztráció: ' + data.json().id);
        }).catch(err => {
            this.msg.error('Hiba történt a regisztráció során!');
            console.log('hiba: ' + err.status);
        });
    }
}