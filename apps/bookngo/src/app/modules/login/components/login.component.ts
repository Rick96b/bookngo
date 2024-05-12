import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TuiButtonModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiInputModule, TuiInputPasswordModule } from '@taiga-ui/kit';
import { UserLoginDto } from '@common';
import { Router } from '@angular/router';
import { LoginService } from '../data/services/login.service';
import { DestroyService } from '@bookngo/base';
import { takeUntil } from 'rxjs';

@Component({
    standalone: true,
    selector: 'app-login',
    templateUrl: './login.component.html',
    imports: [
        ReactiveFormsModule,
        TuiInputModule,
        TuiTextfieldControllerModule,
        TuiInputPasswordModule,
        TuiButtonModule
    ],
    styleUrl: './login.component.scss',
    providers: [LoginService, DestroyService]
})
export class LoginComponent implements OnInit {
    protected authForm: FormGroup;
    protected error: {message: string} = {message: ''}
    constructor(
        private fb: FormBuilder,
        private loginService: LoginService,
        private destroy$: DestroyService
    ) {
    }

    ngOnInit(): void {
        this.authForm = this.fb.group<UserLoginDto>({
            email: '',
            password: ''
        });
    }

    public submit(): void {
        this.loginService.login(this.authForm.getRawValue() as UserLoginDto)
            .pipe(
                takeUntil(this.destroy$)
            ).subscribe();
    }
}
