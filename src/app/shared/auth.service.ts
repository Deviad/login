import {Injectable, Optional} from '@angular/core';

import {CreateTokenService} from './create-token.service';
import {UnixTimeStamp} from './create-token.service';
import {Observable} from 'rxjs/Rx';
import {HttpModule, Http, Headers, RequestOptions, Response} from "@angular/http";
import {Router, ActivatedRoute} from "@angular/router";
import {SigninComponent} from '../unprotected/signin.component';
@Injectable()
export abstract class AuthService {

    loggedIn: boolean = false;

    abstract logout(): any;

    abstract signinUser(secret?: string, router?: Router): any;

    isAuthenticated(): boolean {
        return this.loggedIn;
    }
}

@Injectable()
export class MyLogin extends AuthService {
    options: RequestOptions;
    headers: Headers;
    public loggedIn;

    constructor(private router: Router, private route: ActivatedRoute, private http: Http) {
        super();
        this.loggedIn = !!localStorage.getItem('auth_token');
    }

    signinUser(secret: string) {

        this.headers = new Headers({'Content-Type': 'application/json'});
        this.options = new RequestOptions([{'headers': 'headers'}, {body: ''}]);
        let tokenHolder = new CreateTokenService(secret);
        let now = new UnixTimeStamp();
        // let queryString = 'http://login.myloginonline.com/api/getloggedinuser?timestamp=';
        // let theUrl = queryString + now.unixTimeStamp + '&hash=' + tokenHolder.token.hashed;
        let theUrl = 'http://jsonplaceholder.typicode.com/posts/1';
        this.http.get(
            theUrl
        )
            .map((res: Response) => {
                if (res.status == 200) {
                    localStorage.setItem('auth_token', tokenHolder.token.hashed);
                    this.loggedIn = true;
                    this.router.navigate(['protected'], { relativeTo: this.route });

                }
            })
            .subscribe(
                () => {},
                (error) => {console.log(error);}
            );
    }


    isAuthenticated(): boolean {
        return this.loggedIn;
    }



    logout(): any {
        localStorage.removeItem('auth_token');
        this.loggedIn = false;
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

        return this[myType + 'Login'].signinUser(

            (myType) => {return (myType == 'my') ? secretKey : ''});

    }

}


