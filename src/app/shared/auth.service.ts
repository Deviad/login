import {Injectable, Optional} from '@angular/core';

import {CreateTokenService} from './create-token.service';
import {UnixTimeStamp} from './create-token.service';
import {Observable} from 'rxjs/Rx';
import {HttpModule, Http, Headers, RequestOptions, Response} from "@angular/http";
import {Router, ActivatedRoute} from "@angular/router";
import {SigninComponent} from '../unprotected/signin.component';


@Injectable()
export abstract class AuthService {

    static loggedIn: boolean = false;

    abstract logout(): any;

    abstract signinUser(myType: string, secret?: string): any;

    static isAuthenticated(): boolean {
        return AuthService.loggedIn;
    }
}


@Injectable()
export class MyLogin extends AuthService {
    options: RequestOptions;
    headers: Headers;

    constructor(private router: Router, private route: ActivatedRoute, private http: Http) {
        super();
        AuthService.loggedIn = !!localStorage.getItem('auth_token');
    }

    signinUser(myType: string, secret?: string) {

        this.headers = new Headers({'Content-Type': 'application/json'});
        this.options = new RequestOptions([{'headers': 'headers'}, {body: ''}]);
        let tokenHolder = new CreateTokenService(myType, secret);
        let now = new UnixTimeStamp();
        // let queryString = 'http://login.myloginonline.com/api/getloggedinuser?timestamp=';
        // let theUrl = queryString + now.unixTimeStamp + '&hash=' + tokenHolder.token.hashed;
        let theUrl = 'http://jsonplaceholder.typicode.com/posts/1';
        this.http.get(
            theUrl
        )
            .map((res: Response) => {
                if (res.status == 200) {
                    localStorage.setItem('auth_token', tokenHolder.myCookie);
                    AuthService.loggedIn = true;
                    this.router.navigate(['protected'], { relativeTo: this.route });

                }
            })
            .subscribe(
                () => {},
                (error) => {console.log(error);}
            );
    }




    logout(): any {

        window.alert("EXIT!");
        localStorage.removeItem('auth_token');
        AuthService.loggedIn = false;
        this.router.navigate(['/signin']);
    };

}


@Injectable()
export class FacebookLogin extends AuthService {
    signinUser() {
        window.alert('Facebook Login');
    }

    logout() {
        window.alert('Facebook Logout')
    }
}


@Injectable()
export class GoogleLogin extends AuthService {
    signinUser() {
        window.alert('Google Login');
    }

    logout() {
        window.alert('Google Logout')
    }
}


@Injectable()
export abstract class AuthFactory {
    myLogin: MyLogin;
    facebookLogin: FacebookLogin;
    googleLogin: GoogleLogin;

    constructor (private router: Router, private route: ActivatedRoute, private http: Http, @Optional() myLogin: MyLogin, @Optional() facebookLogin: FacebookLogin, @Optional() googleLogin: GoogleLogin) {


        this.myLogin = myLogin;
        this.facebookLogin = facebookLogin;
        this.googleLogin = googleLogin;

    }


    create(myType: string) {

        myType = myType.toLocaleLowerCase();

        let secretKey = '1234abcd';
        let sendKey = (myType) => {return (myType == 'my') ? secretKey : ''};

        return this[myType + 'Login'].signinUser(myType, sendKey  );
    }

}


