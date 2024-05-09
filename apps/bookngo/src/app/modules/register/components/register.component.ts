import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
    TuiDataListWrapperModule,
    TuiFieldErrorPipeModule,
    TuiInputModule,
    TuiInputPasswordModule,
    TuiSelectModule
} from '@taiga-ui/kit';
import { TuiButtonModule, TuiErrorModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { CustomValidationService } from '../services/ValidationService.service';
import { RegisterService } from '../data/services/register.service';
import { Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { EmployeeStatuses } from '../models/UserModel';
import { catchError, of, takeUntil } from 'rxjs';
import { DestroyService } from '@bookngo/base';

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
    providers: [
        RegisterService
    ]
})
export class RegisterComponent implements OnInit {

    protected items: string[] = [
        'Сотрудник',
        'CEO'
    ];

    protected registerForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private customValidator: CustomValidationService,
        private registerService: RegisterService,
        private router: Router,
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
