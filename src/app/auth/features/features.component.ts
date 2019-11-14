import { Component, OnInit, OnDestroy } from '@angular/core';
import { SecurityService } from 'src/app/core/security/security.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { take } from 'rxjs/operators';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { of, Subscriber } from 'rxjs';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent implements OnInit, OnDestroy {
  public user: firebase.User;

  public memoryLeak = [];

  private itemDoc: AngularFirestoreDocument<any>;

  private subscriptions = new Subscriber();

  constructor(
    private securityService: SecurityService,
    private afAuth: AngularFireAuth,
    private afDb: AngularFirestore
  ) {}

  public ngOnInit() {
    // const test = await this.afAuth.authState.pipe(take(1)).toPromise();
    // console.log(test);

    const userSub = this.securityService.user.subscribe(user => {
      this.user = user;
      console.log(this.user);
    });

    this.subscriptions.add(userSub);

    for (let index = 0; index < 1000000; index++) {
      this.memoryLeak.push(index);
    }

    console.log(this.memoryLeak);
  }

  public ngOnDestroy() {
    this.subscriptions.unsubscribe();
    this.memoryLeak = undefined;
    delete this.memoryLeak;
  }

  async signOut() {
    await this.securityService.doLogOut();
  }

  public addUser(user: any): void {
    this.afDb
      .doc('user')
      .set(user)
      .then(result => {
        console.log(result);
      });
  }
}
