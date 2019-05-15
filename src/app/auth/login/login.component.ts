import { Component, OnInit } from '@angular/core';
import { SecurityService } from 'src/app/core/security/security.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(
    private securityService: SecurityService,
    private router: Router
  ) {}

  public ngOnInit(): void {}

  googleLogin() {
    this.securityService.doGoogleLogin().then(result => {
      console.log('login component:', result);
      this.router.navigate(['features']);
    });
  }
}
