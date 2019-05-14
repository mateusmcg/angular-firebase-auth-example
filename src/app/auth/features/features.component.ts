import { Component, OnInit } from '@angular/core';
import { SecurityService } from 'src/app/core/security/security.service';
import { AuthStateService } from 'src/app/core/security/auth-state.service';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent implements OnInit {
  public user: any;
  test: any;

  constructor(
    private securityService: SecurityService,
    private authState: AuthStateService
  ) {
    this.user = this.authState.user.providerData[0];
  }

  public ngOnInit(): void {
    this.test = 'adsafsafas';
  }

  async signOut() {
    await this.securityService.doLogOut();
  }
}
