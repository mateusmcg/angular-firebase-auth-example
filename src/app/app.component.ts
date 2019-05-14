import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthStateService } from './core/security/auth-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'angular-firebase-auth-example';
  public loggedInUser: any;

  constructor(
    public authState: AuthStateService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.authState.userState.subscribe(
      (user: firebase.User): void => {
        this.loggedInUser = user;
        this.cdRef.detectChanges();
      }
    );
  }
}
