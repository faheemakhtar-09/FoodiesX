import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { switchMap, first, map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(private db: AngularFireDatabase,private afAuth: AngularFireAuth) {}


  ngOnInit(): void {
  }
  getUserByEmail(email: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db
        .list('admin-form-data', (ref) =>
          ref.orderByChild('email').equalTo(email).limitToFirst(1)
        )
        .valueChanges()
        .pipe(
          map((users) => {
            return users.length > 0 ? users[0] : null;
          })
        )
        .subscribe(
          (user) => {
            resolve(user);
          },
          (error) => {
            reject(error);
          }
        );
    });
  }
  email = '';
  password = '';

  login() {
    this.getUserByEmail(this.email)
      .then(user => {
        if (user && user.password === this.password) {
          // User found and password matches
          console.log('Login successful');
          // Perform any additional actions upon successful login
        } else {
          // User not found or password doesn't match
          console.log('Invalid email or password');
        }
      })
      .catch(error => {
        console.log(error);
        // Handle error during user retrieval
      });
  }
  
}  
