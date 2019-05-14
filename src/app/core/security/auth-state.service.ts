import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  public userState = new BehaviorSubject<firebase.User>(null);
  public user: firebase.User = null;

  constructor() {}

  public updateState(user: firebase.User): void {
    this.user = user;
    this.userState.next(user);
  }
}
