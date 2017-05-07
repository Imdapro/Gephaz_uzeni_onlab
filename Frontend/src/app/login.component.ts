import { Component } from '@angular/core';
import {Http} from '@angular/http';
import {AuthenticationService} from './auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'login',
    templateUrl: 'templates/login.component.html'
})

export class LoginComponent {
    public username: string;
    public password: string;

    constructor(http: Http, private authService: AuthenticationService, private router: Router) {
        this.username = '';
        this.password = '';
    }

    public login() {
        this.authService.login(this.username, this.password);
        this.router.navigate(['./messages']);
    }
}
