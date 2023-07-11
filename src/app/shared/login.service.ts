import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loggedIn = false; // Flag to track login status

  constructor() {
    const storedLoggedIn = localStorage.getItem('loggedIn');
    this.loggedIn = storedLoggedIn === 'true';
  }
  
  setLoggedIn(value: boolean) {
    this.loggedIn = value;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
  logout() {
    this.loggedIn = false;
    localStorage.removeItem('loggedInUser');
  }
  
}
