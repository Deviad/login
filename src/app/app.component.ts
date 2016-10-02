import { Component } from "@angular/core";

import { HeaderComponent } from "./shared/header.component";

@Component({
  selector: 'my-app',
  template: `
 <my-header></my-header>
  <div class="container">
    <div class="row">
      <div class="col-md-10 col-md-offset-1">
        <router-outlet></router-outlet>
      </div>
    </div>
  </div>
`
})
export class AppComponent {
}
