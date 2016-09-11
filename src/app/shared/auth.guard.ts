import { Injectable, Inject, Optional } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Rx";
import { AuthService, MyLogin, FacebookLogin, GoogleLogin } from "./auth.service";
// import { SigninComponent } from '../unprotected/signin.component';



// interface MyCanActivate extends CanActivate {
//
//   typeSelector(type:string):any;
//
// }

@Injectable()

export class AuthGuard implements CanActivate  {

   // signIn: SigninComponent;
   // myLogin: MyLogin;
   // facebookLogin: FacebookLogin;
   // googleLogin: GoogleLogin;





  // constructor(@Optional() signIn: SigninComponent, @Optional() myLogin: MyLogin, @Optional() facebookLogin: FacebookLogin, @Optional() googleLogin: GoogleLogin) {
  //   this.signIn = signIn;
  //   this.myLogin = myLogin;
  //   this.facebookLogin = facebookLogin;
  //   this.googleLogin = googleLogin;
  // }

    constructor() {
    }


  // typeSelector(myType: string) : boolean{
  //   myType = myType.toLocaleLowerCase();
  //
  //   window.alert('CICCIO PIZZO '+ myType);
  //
  //     return (myType) ? this[myType+'Login'].isAuthenticated() : false;
  //
  //
  // }



  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

      // return this.typeSelector(SigninComponent.loginTypeProperty);
      let isLogged: boolean = AuthService.loggedIn;
      window.alert('isLogged =' + isLogged);
      return isLogged;
  }
}



