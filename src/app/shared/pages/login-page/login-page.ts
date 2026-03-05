import { LoadingService } from './../../services/loading.service';
import { AuthService } from './../../../core/services/auth.service';
import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginFormData } from './loginFormModel.interface';
import { form, required, submit, validate, FormField } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { ErrorIcon } from '../../icons/error-icon';

@Component({
  selector: 'app-login',
  templateUrl: './login-page.html',
  imports: [ErrorIcon, FormField],
})
export class LoginComponent {
  //private authService: AuthService
  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingService: LoadingService
  ) {}

  showPassword = signal(false);
  togglePasswordVisibility() {
    this.showPassword.set(!this.showPassword());
  }

  loginModel = signal<LoginFormData>({
    email: 'prueba1@gmail.com',
    password: '12345',
  });

  loginForm = form(this.loginModel, (path) => {
    required(path.email, { message: 'email required' });
    required(path.password, { message: 'password required' });
    //check Email
    validate(path.email, ({ value }) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value())) {
        return { message: 'invalid email', kind: 'error' };
      }
      return null;
    });
  });

  isFieldInvalid(fieldName: keyof LoginFormData): boolean {
    const fieldSignal = this.loginForm[fieldName];
    if (!fieldSignal) return false;

    const field = fieldSignal();
    return field && field.touched() && field.errors().length > 0;
  }

  onSubmit(event: Event) {
    event.preventDefault();
     
    submit(this.loginForm, async (e) => {
        this.loadingService.show();
      this.authService.login(this.loginModel()).subscribe({
        next: (res) => {
          console.log('Login successful:', res);
          this.router.navigate(['/taskmanager/taskgesture']);
          this.loadingService.hide();
        },
        error: (err) => {
          console.error('Login failed:', err);
          this.loadingService.hide();
        },
      });
    });
  }
}
