import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable()
export class BaseValidatorService {
    handleErrors(formGroup: FormGroup, error: HttpErrorResponse): void {
        if (error.status === 400) {
            Object.keys(error.error).forEach(prop => {
                const formControl = formGroup.get(prop);
                if (formControl) {
                // activate the error message
                formControl.setErrors({
                    serverError: error.error[prop]
                });
                }
            })
        }
    }
}
