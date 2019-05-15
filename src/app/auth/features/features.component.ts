import { Component, OnInit } from '@angular/core';
import { SecurityService } from 'src/app/core/security/security.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent implements OnInit {
  public user: firebase.User;

  constructor(
    private securityService: SecurityService,
    private afAuth: AngularFireAuth
  ) {}

  public async ngOnInit() {
    const test = await this.afAuth.authState.pipe(take(1)).toPromise();
    console.log(test);

    this.securityService.user.subscribe(user => {
      this.user = user;
      console.log(this.user);
    });
  }

  async signOut() {
    await this.securityService.doLogOut();
  }
}
