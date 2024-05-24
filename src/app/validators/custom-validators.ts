import { AbstractControl, ValidationErrors } from '@angular/forms';

export const passwordMatchValidator = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  // If either field is empty, or the passwords match, return null (valid)
  if (!password || !confirmPassword || password.value === confirmPassword.value) {
    return null;
  }

  // If passwords don't match, return an error object
  return { passwordMismatch: true };
};
