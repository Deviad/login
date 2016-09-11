
import { NgModule, provide, Injectable } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { HttpModule, Http } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { AppComponent }   from './app.component';
import { HeaderComponent } from "./shared/header.component";
import { SigninComponent } from "./unprotected/signin.component";
import { SignupComponent } from "./unprotected/signup.component";
import { ProtectedComponent } from "./protected/protected.component";
import {CreateTokenService} from './shared/create-token.service';
import { AuthGuard } from "./shared/auth.guard";
import { AuthService, AuthFactory, MyLogin, FacebookLogin, GoogleLogin } from "./shared/auth.service";
import { routing } from "./app.routing";

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        SigninComponent,
        SignupComponent,
        ProtectedComponent
    ],
    imports: [BrowserModule, HttpModule, routing, ReactiveFormsModule],

    providers: [
        AuthGuard,
        AuthService,
        AuthFactory,
        SigninComponent,
        MyLogin,
        FacebookLogin,
        GoogleLogin,
        CreateTokenService,
        {provide: AuthHttp,
                useFactory: (http) => {
                    return new AuthHttp(new AuthConfig({
            //            globalHeaders: [{'Content-Type':'application/json'}],
                        globalHeaders: [{}],
                        noJwtError: true,
                    }), http);
                },
                deps: [Http]
        },
      //  {provide: HttpClient, useFactory:(http,router) => new HttpClient(http, router), deps:[AuthHttp, Router]}
    ],
    
    bootstrap: [AppComponent]
})
export class AppModule {}