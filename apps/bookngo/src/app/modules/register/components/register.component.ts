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
import { RegisterService } from '../data/services/register.service';
import { AsyncPipe } from '@angular/common';
import { EmployeeStatuses } from '../models/UserModel';
import { catchError, of, takeUntil } from 'rxjs';
import { DestroyService } from '@bookngo/base';
import { RegistrationValidationService } from '../services/RegistrationValidator.service';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterLink } from '@angular/router';

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
        RouterLink,
        TuiErrorModule
    ],
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    providers: [
        RegisterService,
        RegistrationValidationService,
        {
            provide: TUI_VALIDATION_ERRORS,
            useValue: {
                required: 'Enter this!',
                email: 'Enter a valid email',
                invalidPassword: 'The password must be at least 8 characters long and contain at least one uppercase and lowercase letter, a special character and a number.',
                passwordMismatch: 'Password missmatch'
            },
        },
    ]
})
export class RegisterComponent implements OnInit {

    protected items: string[] = [
        'Сотрудник',
        'CEO'
    ];
    public error: { message: string } = { message: '' };

    protected registerForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private customValidator: RegistrationValidationService,
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
            employmentStatus: EmployeeStatuses[user.employmentStatus as 'Сотрудник' | 'CEO']
        }).pipe(
            catchError((err: HttpErrorResponse) => {
                this.error = err.error;
                return of(err);
            }),
            takeUntil(this.destroy$)
        ).subscribe();

    }
}
