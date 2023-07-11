import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { switchMap, first, map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-signup',
  templateUrl: './admin-signup.component.html',
  styleUrls: ['./admin-signup.component.css']
})

export class AdminSignupComponent implements OnInit {
  formData = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };

  firstName = '';
  lastName = '';
  email = '';
  password = '';

  // ...
  
  constructor(private db: AngularFireDatabase) {}
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }
  signup(formData: any): Promise<any> {
    const email = formData.email;
  
    // Check if user already exists
    return this.checkUserExists(email)
      .pipe(
        switchMap((userExists) => {
          if (userExists) {
            throw new Error('User already exists');
          } else {
            // Add user data to database
            return this.db.list('admin-form-data').push(formData).then(() => {
              return Promise.resolve();
            });
          }
        })
      )
      .toPromise()
      .catch((error) => {
        // Display alert message for the error
        throw error; // Rethrow the error for further handling if needed
      });
  }
  
  private checkUserExists(email: string): Observable<boolean> {
    // Perform the check using AngularFire's valueChanges() method
    return this.db
      .list('admin-form-data', (ref) =>
        ref.orderByChild('email').equalTo(email).limitToFirst(1)
      )
      .valueChanges()
      .pipe(
        first(),
        map((users) => {
          return users.length > 0;
        })
      );
  }
}  