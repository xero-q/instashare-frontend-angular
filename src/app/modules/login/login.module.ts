import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    LoginComponent   
  ]
})
export class LoginModule { }
