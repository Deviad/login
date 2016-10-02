
import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { HttpModule, Http } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { AppComponent }   from './app.component';
import { HeaderComponent } from './shared/header.component';
import { CreateTokenService, UnixTimeStamp, CreateHash } from './shared/create-token.service';
import { AuthGuard } from './shared/auth.guard';
import { AuthFactory, MyLogin, FacebookLogin, GoogleLogin } from './shared/auth.service';
import { AppRoutingModule, routingComponents } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    routingComponents
  ],
  imports: [BrowserModule, HttpModule, AppRoutingModule, ReactiveFormsModule],

  providers: [
    AuthGuard,
    AuthFactory,
    MyLogin,
    FacebookLogin,
    GoogleLogin,
    CreateTokenService,
    UnixTimeStamp,
    CreateHash,
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
