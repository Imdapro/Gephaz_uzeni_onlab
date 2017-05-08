import {JwtHelper, tokenNotExpired} from 'angular2-jwt';
import {Injectable} from '@angular/core';
import {RequestOptions, Headers, Http, RequestOptionsArgs} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/toPromise';
import {restApi} from './config';
import 'rxjs/add/operator/map';

@Injectable()
export class  AuthenticationService {
    public token: string;
    private jwtHelper: JwtHelper;

    constructor(private http: Http) {
        this.jwtHelper = new JwtHelper();
    }

    public login(username: string, password: string)  {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(restApi + '/auth', JSON.stringify({ username: username, password: password }), options)
            .toPromise().then((response) => {
                let token = response.json() && response.json().token;
                if (token) {
                    this.token = token;
                    localStorage.setItem('token', token);
                    return true;
                }
                return false;
        }).catch((data) => {
            return false;
        });
    }

    public logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('token');
    }

    public loggedIn() {
        return tokenNotExpired();
    }
}
