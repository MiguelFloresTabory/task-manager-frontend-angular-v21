import { LoadingService } from './../../services/loading.service';
import { AuthService } from './../../../core/services/auth.service';
import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { form, required, validate, submit, FormField } from '@angular/forms/signals';
import { ErrorIcon } from '../../icons/error-icon';

interface RegisterFormData {
  name: string;
  dni: string;
  number: string;
  email: string;
  password: string;
  confirmPassword: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register-page.html',
  imports: [ErrorIcon, FormField],
})
export class RegisterPage {

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingService: LoadingService
  ) {}

  showPassword = signal(false);
    showconfirmPassword = signal(false);

  togglePasswordVisibility() {
    this.showPassword.set(!this.showPassword());
  }

    toggleConfirmPasswordVisibility() {
    this.showconfirmPassword.set(!this.showconfirmPassword());
  }

  registerModel = signal<RegisterFormData>({
    name: '',
    dni: '',
    number: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  registerForm = form(this.registerModel, (path) => {

    required(path.name, { message: 'name required' });

    required(path.dni, { message: 'dni required' });
    validate(path.dni, ({ value }) => {
      const dniRegex = /^\d{8}$/;
      if (!dniRegex.test(value())) {
        return { message: 'dni must have 8 digits', kind: 'error' };
      }
      return null;
    });

    required(path.number, { message: 'number required' });
    validate(path.number, ({ value }) => {
      const phoneRegex = /^\d{9}$/;
      if (!phoneRegex.test(value())) {
        return { message: 'phone must have 9 digits', kind: 'error' };
      }
      return null;
    });

    required(path.email, { message: 'email required' });
    validate(path.email, ({ value }) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value())) {
        return { message: 'invalid email', kind: 'error' };
      }
      return null;
    });

    required(path.password, { message: 'password required' });
    validate(path.password, ({ value }) => {
      if (value().length < 5) {
        return { message: 'min 5 characters', kind: 'error' };
      }
       if (value() !== this.registerModel().confirmPassword) {
        return { message: 'passwords do not match', kind: 'error' };
      }
      return null;
    });

    required(path.confirmPassword, { message: 'confirm password required' });
    validate(path.confirmPassword, ({ value }) => {
      if (value() !== this.registerModel().password) {
        return { message: 'passwords do not match', kind: 'error' };
      }
      return null;
    });


  });

  isFieldInvalid(fieldName: keyof RegisterFormData): boolean {
    const fieldSignal = this.registerForm[fieldName];
    if (!fieldSignal) return false;

    const field = fieldSignal();
    return field && field.touched() && field.errors().length > 0;
  }

  onSubmit(event: Event) {
    event.preventDefault();

 

    submit(this.registerForm, async () => {
         this.loadingService.show();

      this.authService.register(this.registerModel()).subscribe({
        next: (res) => {
          console.log('Register successful:', res);
           this.router.navigate(['/taskmanager/taskgesture']);
          this.loadingService.hide();
        },
        error: (err) => {
          console.error('Register failed:', err);
          this.loadingService.hide();
        }

      });

    });
  }
}