import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TuiButtonModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiInputModule, TuiInputPasswordModule } from '@taiga-ui/kit';
import { AuthService } from '../../../base/services/auth.service';
import { UserLoginDto } from '@common';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

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
    styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
    protected authForm: FormGroup;
    error: {message: string} = {message: ''}
    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.authForm = this.fb.group<UserLoginDto>({
            email: '',
            password: ''
        });
    }

    public submit(): void {
        const user = this.authForm.value;

        this.authService.login({
            email: user.email,
            password: user.password
        }).subscribe({
            next: () => this.router.navigate(['/cabinet']),
            error: (error: HttpErrorResponse) => this.error = error.error
        });

    }
}
