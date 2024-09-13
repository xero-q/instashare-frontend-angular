import { NgIf, NgStyle, NgClass } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [NgIf, NgStyle, NgClass, ReactiveFormsModule, ButtonModule, InputTextModule, PasswordModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm!: FormGroup;
  errorMessage: string = '';
  REGULAR_EXPRESSION_USERNAME= '^[a-zA-Z0-9_-]{1,50}$';
  REGULAR_EXPRESSION_PASSWORD = '^[\\S]{1,50}$';
  
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService
  ) {    
  } 

  ngOnInit() {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern(this.REGULAR_EXPRESSION_USERNAME)]],
      password: ['', [Validators.required, Validators.pattern(this.REGULAR_EXPRESSION_PASSWORD), Validators.minLength(6)]],
      passwordConfirm: ['', [Validators.required, Validators.pattern(this.REGULAR_EXPRESSION_PASSWORD), Validators.minLength(6)]],
      email: ['',[Validators.required, Validators.email]]
    },{ validators: this.passwordsMatchValidator });
  }

  get username() {
    return this.signupForm.get('username');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get passwordConfirm() {
    return this.signupForm.get('passwordConfirm');
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
            this.toastr.success('User registered successfully','Success');
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

  passwordsMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('passwordConfirm')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

}
