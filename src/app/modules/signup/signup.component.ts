import { NgIf, NgStyle, NgClass } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-signup',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [NgIf, NgStyle, NgClass, ReactiveFormsModule, ButtonModule, InputTextModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm!: FormGroup;
  errorMessage: string = '';
  
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {    
  }
  

  ngOnInit() {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['',[Validators.required, Validators.email]]
    });
  }

  get username() {
    return this.signupForm.get('username');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get email() {
    return this.signupForm.get('email');
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.authService
        .signup(this.username?.value, this.password?.value, this.email?.value)
        .subscribe({
          next: () => {            
            this.router.navigateByUrl('/login');            
          },
          error: (err) => {
            console.log(err);
            const firstError = Object.keys(err.error)[0];
            this.errorMessage = 'Error: ' + err.error[firstError][0];
          }
        });
      
    }
  }

}
