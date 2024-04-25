import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TuiButtonModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiInputModule, TuiInputPasswordModule } from '@taiga-ui/kit';
import { AuthService } from '../../../base/services/auth.service';
import { UserLoginDto } from '@common';
import { Router } from '@angular/router';

@Component({
    standalone: true,
    selector: 'app-login',
    templateUrl: './login.component.html',
    imports: [
        TuiInputModule,
        TuiTextfieldControllerModule,
        TuiButtonModule,
        ReactiveFormsModule,
        TuiInputPasswordModule
    ],
    styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
    protected authForm: FormGroup;

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
            next: () => this.router.navigate(['/home'])
        });

    }
}
