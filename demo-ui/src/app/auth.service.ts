import { Injectable } from '@angular/core';
import KeyClock from 'keycloak-js';
import { UserProfile } from './user-profile';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _keyClock: KeyClock | undefined;
  private _profile: UserProfile | undefined;

  // This is the KeyClock instance that will be used to authenticate the user.
  get keyClock() {
    if (!this._keyClock) {
      this._keyClock = new KeyClock({
        url: 'http://localhost:8080',
        realm: 'bsn',
        clientId: 'book-network',
      });
    }
    return this._keyClock;
  }

  get profile(): UserProfile | undefined {
    return this._profile;
  }
  constructor() {}

  async init() {
    console.log('AuthService.init()');
    const authenticated = await this.keyClock?.init({
      onLoad: 'login-required',
    });
    if (authenticated) {
      console.log('AuthService.init() - authenticated');
      this._profile = await this.keyClock?.loadUserProfile();
      this._profile.token = await this.keyClock?.token;
    }
  }

  async login() {
    console.log('AuthService.login()');
    await this.keyClock?.login();
  }

  async logout() {
    console.log('AuthService.logout()');
    await this.keyClock?.logout();
  }
}
