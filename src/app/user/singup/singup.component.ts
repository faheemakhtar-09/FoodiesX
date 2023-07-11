import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthServService } from 'src/app/shared/auth-serv.service';
import { formsData } from 'src/app/shared/fomrsdata';
import { Router } from '@angular/router';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    http: HttpClient,
    public crudApi: AuthServService,
    private router:Router

  ) {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      fullname: ['', [Validators.required,]]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const formData = {
        fullname: this.signupForm.value.fullname,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password
      };

      this.crudApi.signup(formData)
        .then(() => {
          console.log('Signup successful');
          this.router.navigate(['/login']);

        })
        .catch((error) => {
          // Display error message to the user
          alert(error.message);
        });
    }
  }
}
