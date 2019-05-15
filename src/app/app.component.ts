import { Component } from '@angular/core';
import { SecurityService } from './core/security/security.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'angular-firebase-auth-example';
  public loggedInUser: any;

  constructor(public securityService: SecurityService) {}
}
