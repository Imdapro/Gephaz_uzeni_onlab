import { Component } from '@angular/core';
import {Http} from '@angular/http';
import {AuthenticationService} from './auth.service';
import {Router} from '@angular/router';
import {MessagesService} from './ng2-messages/ng2-messages.service';


@Component({
    selector: 'login',
    templateUrl: 'templates/login.component.html'
})

export class LoginComponent {
    public username: string;
    public password: string;

    constructor(http: Http, private authService: AuthenticationService, private router: Router, private msg: MessagesService) {
        this.username = '';
        this.password = '';
    }

    public login() {
        this.authService.login(this.username, this.password).then((data) => {
                if (data == true) {
                    console.log('sikeres bejelentkezés');
                    this.router.navigate(['./messages']);
                    this.msg.success('Sikeres bejelentkezés');
                } else {
                    console.log('sikertelen bejelentkezés');
                    this.msg.error('Sikertelen bejelentkezés');
                }
            }).catch(() => {
                console.log('sikertelen bejelentkezés');
        });
    }
}
