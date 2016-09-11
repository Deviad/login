import {Component, Injectable, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators, REACTIVE_FORM_DIRECTIVES} from "@angular/forms";

import {AuthService, AuthFactory} from "../shared/auth.service";
import {AuthGuard} from '../shared/auth.guard';

export var loginTypeProperty: string;

@Component({
    template: `
        <h3>Please sign up to use all features</h3>
            
            <button type="button" (click)="onSignin('my')" class="btn btn-primary">Sign In With MyLogin</button>
            <button type="button" (click)="onSignin('facebook')" class="btn btn-primary">Sign In With Facebook</button>
            <button type="button" (click)="onSignin('google')" class="btn btn-primary">Sign In With Google</button>

    `
})


@Injectable()



export class SigninComponent {



    constructor(private authFactory: AuthFactory) {
    }

    onSignin(loginType) {
        loginTypeProperty = loginType;
        window.alert('PIPPO IS ' + loginTypeProperty);
        this.authFactory.create(loginType);
    }

}
