import { tokenNotExpired } from 'angular2-jwt';

export function loggedIn() {
        return tokenNotExpired();
}