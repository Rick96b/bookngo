import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';
import { BaseValidatorService } from '../../common/services/baseValidator.service';

@Injectable()
export class CustomValidationService extends BaseValidatorService {
    patternValidator(): ValidatorFn {
        return (control: AbstractControl) => {
          if (!control.value) {
            return null;
          }
          const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
          const valid = regex.test(control.value);
          return valid ? null : { invalidPassword: true };
        };
      }

    MatchPassword(password: string, confirmPassword: string) {
        return (formGroup: FormGroup) => {
            const passwordControl = formGroup.controls[password];
            const confirmPasswordControl = formGroup.controls[confirmPassword];

            if (!passwordControl || !confirmPasswordControl) {
            return null;
            }

            if (confirmPasswordControl.errors && !confirmPasswordControl.errors['passwordMismatch']) {
            return null;
            }

            if (passwordControl.value !== confirmPasswordControl.value) {
            confirmPasswordControl.setErrors({ passwordMismatch: true });
            } else {
            confirmPasswordControl.setErrors(null);
            }
            return null
        }
    }
}
