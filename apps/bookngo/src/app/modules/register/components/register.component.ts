import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {TuiDataListWrapperModule, TuiInputModule, TuiInputPasswordModule, TuiSelectModule} from '@taiga-ui/kit';
import {TuiButtonModule, TuiDataListModule, TuiTextfieldControllerModule} from '@taiga-ui/core';
import { CustomValidationService } from '../services/ValidationService.service';
import { RegisterService } from '../data/services/register.service';
import { BnInputComponent } from '@bookngo/ui-components'
import { Router } from '@angular/router';
import { AuthService } from "@bookngo/base";

@Component({
    standalone: true,
    selector: 'app-register',
    imports: [
        ReactiveFormsModule,
        TuiSelectModule,
        TuiDataListWrapperModule,
        TuiDataListModule,
        FormsModule,
        TuiTextfieldControllerModule,
        TuiInputModule,
        TuiInputPasswordModule,
        TuiButtonModule,
        BnInputComponent,
    ],
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    providers: [
      RegisterService
    ]
})
export class RegisterComponent implements OnInit{
    items = [
        'Сотрудник',
        'CEO'
    ];
    registerForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private customValidator: CustomValidationService,
        private registerService: RegisterService,
        private router: Router,
        private authService: AuthService
    ){}

    ngOnInit(): void {
        this.registerForm = this.fb.group({
            employmentStatus: [this.items[0], Validators.required],
            companyName: ["", Validators.required],
            companyDepartment: "",
            fullName: ["", Validators.required],
            email: ["", [Validators.required, Validators.email]],
            password: ["", Validators.compose([Validators.required, this.customValidator.patternValidator()])],
            confirmPassword: ""
        },
        {
          validator: this.customValidator.MatchPassword('password', 'confirmPassword'),
        }
        );
    }

    submit() {
        const user = this.registerForm.value
        const token = this.registerService.registerUser({
            employmentStatus: user.employmentStatus,
            companyName: user.companyName,
            companyDepartment: user.companyDepartment,
            fullName: user.fullName,
            email: user.email,
            password: user.password
        })
        this.authService.loginByToken(token)
        this.router.navigate(['/home'])
    }


}
