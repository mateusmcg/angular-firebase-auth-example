import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { AuthStateService } from './auth-state.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  constructor(
    private afAuth: AngularFireAuth,
    private authState: AuthStateService,
    private router: Router
  ) {
    this.afAuth.auth.onAuthStateChanged((user: firebase.User) => {
      console.log('Auth changed', user);
      this.authState.updateState(user);
    });
  }

  doGoogleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    return this.afAuth.auth.signInWithPopup(provider);
  }

  async doLogOut() {
    this.router.navigate(['']);
    return await this.afAuth.auth.signOut();
  }
}
