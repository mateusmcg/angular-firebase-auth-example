import { Component, OnInit } from '@angular/core';
import { SecurityService } from 'src/app/core/security/security.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { map, switchMap, flatMap, take } from 'rxjs/operators';
import { combineLatest, forkJoin, merge, Observable, from } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  constructor(private afDb: AngularFirestore) {}

  ngOnInit() {}

  public add(): void {
    const user = {
      name: 'HAHAHAHA',
      email: 'teste@tes.dsao',
      profile_pic: 'dfasdasfsa',
      favorites: {}
    };

    this.afDb
      .doc('users/1')
      .set(user)
      .then(result => {
        console.log(result);
      });
  }

  public addFavorite(): void {
    const userId = 1;
    const superHeroId = 'dafadawd';

    const updates = {
      [`${superHeroId}`]: true
    };

    this.afDb
      .doc(`user-favorites/${userId}`)
      .update(updates)
      .then(result => {
        console.log(result);
      });
  }

  public getUserFavorites(userId): void {
    this.test(userId).subscribe(async superHeros => {
      console.log(await superHeros.toPromise());
    });

    // this.afDb
    //   .doc(`user-favorites/${userId}`)
    //   .get()
    //   .subscribe(result => {
    //     console.log('get', result.data());
    //   });

    // this.afDb
    //   .doc(`user-favorites/${userId}`)
    //   .snapshotChanges()
    //   .subscribe(result => {
    //     console.log('snap', result.payload.data());
    //   });
  }

  private test(userId) {
    return this.afDb
      .doc(`user-favorites/${userId}`)
      .valueChanges()
      .pipe(
        map(result => {
          return Object.keys(result).map(async key => {
            return await this.afDb.doc(`superheros/${key}`).get();
          });
        }),
        map(result => {
          return forkJoin(result);
        })
      );
  }
}
