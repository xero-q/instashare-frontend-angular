import { NgClass, NgIf, NgStyle } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Router, RouterModule } from '@angular/router';
import ROUTES from '../../shared/routes';

@Component({
  selector: 'app-login',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  imports: [NgIf, NgStyle, NgClass, ReactiveFormsModule, ButtonModule, InputTextModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false; 
  SIGNUP_ROUTE = '/' + ROUTES.SIGNUP;
  
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    if (authService.isLoggedIn){
      router.navigateByUrl(ROUTES.FILES);
    }
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.authService
        .login(this.username?.value, this.password?.value)
        .subscribe({
          next: (response) => {
            this.isLoading = false;
            this.errorMessage = '';
            const redirectUrl = this.authService.loginRedirectUrl;
            if (redirectUrl) {
              this.authService.loginRedirectUrl = '';
              this.router.navigateByUrl(redirectUrl);
            } else {
              this.router.navigateByUrl(ROUTES.FILES);
            }
          },
          error: (err) => {
            this.isLoading = false;
            this.errorMessage = err;
          }
        });     
    }
  }
}
