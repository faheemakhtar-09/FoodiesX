import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthServService } from 'src/app/shared/auth-serv.service';
import { LoginService } from 'src/app/shared/login.service';
interface LoginForm {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup & LoginForm; // Change type to 'unknown'

  constructor(
    private formBuilder: FormBuilder,
    private afAuth: AngularFireAuth,
    private router: Router,
    private authService:AuthServService,
    private loginService: LoginService
  ) {}
  loggedIn = false; // Flag to track login status
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    }) as unknown as FormGroup & LoginForm; // Perform type assertion
  }
  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
  
      this.authService.getUserByEmail(email)
        .then((user) => {
          if (user && user.password === password) {
            // Login successful, navigate to home or desired page
            this.router.navigate(['/home']);
            this.loginService.setLoggedIn(true); // Set the login status in the shared service
          } else {
            // Invalid credentials, display error message
            alert('Invalid email or password.');
          }
        })
        .catch((error) => {
          // Display error message to the user
          console.error(error);
          alert('Login failed. Please try again later.');
        });
    }
  }
}  