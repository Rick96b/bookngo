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
import { Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { EmployeeStatuses } from '../models/UserModel';
import { HttpErrorResponse } from '@angular/common/http';

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
        TuiErrorModule,
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
export class RegisterComponent implements OnInit{
    items = [
        'Сотрудник',
        'CEO'
    ];
    error: {message: string} = {message: ''}
    registerForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private registrationValidator: RegistrationValidationService,
        private registerService: RegisterService,
        private router: Router,
    ){}

    ngOnInit(): void {
        this.registerForm = this.fb.group({
            employmentStatus: [this.items[0], Validators.required],
            companyName: ["", Validators.required],
            companyDepartment: "",
            fullName: ["", Validators.required],
            email: ["", [Validators.required, Validators.email]],
            password: ["", Validators.compose([Validators.required, this.registrationValidator.patternValidator()])],
            confirmPassword: ""
        },
        {
          validator: this.registrationValidator.MatchPassword('password', 'confirmPassword'),
        }
        );
    }

    public submit(): void {
        const user = this.registerForm.value
        this.registerService.registerUser({
            employmentStatus: EmployeeStatuses[user.employmentStatus as 'Сотрудник' | 'CEO'],
            companyName: user.companyName,
            companyDepartment: user.companyDepartment,
            fullName: user.fullName,
            email: user.email,
            password: user.password
        }).subscribe({
            next: () => this.router.navigate(['cabinet']),
            error: (err: HttpErrorResponse) => {
                this.error = err.error
            }
        });
    }


}
