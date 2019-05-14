import { Component, OnInit } from '@angular/core';
import { SecurityService } from 'src/app/core/security/security.service';
import { Router } from '@angular/router';
import { AuthStateService } from 'src/app/core/security/auth-state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(
    private securityService: SecurityService,
    private authState: AuthStateService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.authState.userState.subscribe(user => {
      if (user) {
        this.router.navigate(['features']);
      }
    });
  }

  googleLogin() {
    this.securityService.doGoogleLogin().then(result => {
      console.log('login component:', result);
      this.router.navigate(['features']);
    });
  }
}
