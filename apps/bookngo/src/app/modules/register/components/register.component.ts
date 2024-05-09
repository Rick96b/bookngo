import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
    TUI_VALIDATION_ERRORS,
    TuiDataListWrapperModule,
    TuiFieldErrorPipeModule,
    TuiInputModule,
    TuiInputPasswordModule,
    TuiSelectModule
} from '@taiga-ui/kit';
import { TuiButtonModule, TuiErrorModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { RegistrationValidationService } from '../services/RegistrationValidator.service';
import { RegisterService } from '../data/services/register.service';
import { AsyncPipe } from '@angular/common';
import { EmployeeStatuses } from '../models/UserModel';
import { catchError, of, takeUntil } from 'rxjs';
import { DestroyService } from '@bookngo/base';
import { BaseValidatorService } from '../../common/services/baseValidator.service';

@Component({
    standalone: true,
    selector: 'app-register',
    imports: [
        ReactiveFormsModule,
        TuiSelectModule,
        TuiTextfieldControllerModule,
        TuiDataListWrapperModule,
        TuiInputModule,
        TuiInputPasswordModule,
        TuiButtonModule,
        TuiFieldErrorPipeModule,
        AsyncPipe,
        TuiErrorModule
    ],
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    providers: [ RegisterService, RegistrationValidationService,
      {
        provide: TUI_VALIDATION_ERRORS,
        useValue: {
            required: 'This field is required!',
            email: 'Enter a valid email',
            invalidPassword: 'The password must not be shorter than 8 characters and must contain at least one lowercase and one uppercase letter, a special character and a number',
            passwordMismatch: 'Passwords missmatch',
            
        },
    },
    ]
})
export class RegisterComponent implements OnInit {

    protected items: string[] = [
        'Сотрудник',
        'CEO'
    ];
    error: {message: string} = {message: ''}

    protected registerForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private registrationValidator: RegistrationValidationService,
        private registerService: RegisterService,
        private destroy$: DestroyService
    ) {
    }

    ngOnInit(): void {
        this.registerForm = this.fb.group({
                employmentStatus: [this.items[0], Validators.required],
                companyName: ['', Validators.required],
                companyDepartment: '',
                fullName: ['', Validators.required],
                email: ['', [Validators.required, Validators.email]],
                password: ['', Validators.compose([Validators.required, this.customValidator.patternValidator()])],
                confirmPassword: ''
            }, {
                validator: this.customValidator.MatchPassword('password', 'confirmPassword')
            }
        );
    }

    public submit(): void {
        const user = this.registerForm.value;
        delete user.confirmPassword;

        this.registerService.registerUser({
            ...user,
            employmentStatus: EmployeeStatuses[user.employmentStatus as 'Сотрудник' | 'CEO'],

        }).pipe(
            catchError((err) => {
                this.customValidator.handleErrors(this.registerForm, err);
                return of(err)
            }),
            takeUntil(this.destroy$)
        ).subscribe();

    }


}
