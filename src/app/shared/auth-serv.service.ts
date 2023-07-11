import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthServService {
  constructor(private db: AngularFireDatabase,private afAuth: AngularFireAuth) {}
// siginup 
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
            return this.db.list('user-form-data').push(formData).then(() => {
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
      .list('user-form-data', (ref) =>
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
  // login 
 
  getUserByEmail(email: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db
        .list('user-form-data', (ref) =>
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
}