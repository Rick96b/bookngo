import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
    TUI_VALIDATION_ERRORS,
    TuiDataListWrapperModule,
    TuiFieldErrorPipeModule,
    TuiInputModule,
    TuiInputPasswordModule,
    TuiSelectModule
} from '@taiga-ui/kit';
import {
    TuiButtonModule,
    TuiErrorModule,
    TuiSvgModule,
    TuiTextfieldControllerModule
} from '@taiga-ui/core';
import { RegisterService } from '../data/services/register.service';
import { AsyncPipe } from '@angular/common';
import { EmployeeStatuses } from '../models/UserModel';
import { catchError, finalize, of, takeUntil } from 'rxjs';
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
        TuiErrorModule,
        TuiSvgModule
    ],
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    providers: [
        RegisterService,
        RegistrationValidationService,
        {
            provide: TUI_VALIDATION_ERRORS,
            useValue: {
                required: 'Поле обязательно для заполнения!',
                email: 'Введите корректный адрес электронной почты',
                invalidPassword: 'Пароль должен состоять не менее чем из 8 символов и содержать как минимум одну заглавную и строчную букву, специальный символ и цифру',
                passwordMismatch: 'Пароли не совпадают'
            },
        },
    ]
})
export class RegisterComponent implements OnInit {

    protected readonly loader: WritableSignal<boolean> = signal(false);

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
        this.loader.set(true);

        this.registerService.registerUser({
            ...user,
            employmentStatus: EmployeeStatuses[user.employmentStatus as 'Сотрудник' | 'CEO']
        }).pipe(
            finalize(() => this.loader.set(false)),
            catchError((err: HttpErrorResponse) => {
                this.error = err.error;

                return of(err);
            }),
            takeUntil(this.destroy$)
        ).subscribe();

    }
}
