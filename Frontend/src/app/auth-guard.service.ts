import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import {AuthenticationService} from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private auth: AuthenticationService, private router: Router) {}

    /**
     * Megadja, hogy be vagyunk-e jelentkezve. Ha nem, akkor a főoldalra navigál.
     * @returns {boolean}
     */
    canActivate() {
        if (this.auth.loggedIn()) {
            return true;
        } else {
            this.router.navigate(['./']);
            return false;
        }
    }
}
