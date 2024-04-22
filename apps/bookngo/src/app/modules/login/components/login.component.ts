import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TuiButtonModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiInputModule, TuiInputPasswordModule } from '@taiga-ui/kit';
import { AuthService } from '../../common/services/auth.service';
import { UserLoginDto } from '@common';

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
    authForm: FormGroup
    constructor(
        private fb: FormBuilder,
        private authService: AuthService
    ){}

    ngOnInit(): void {
        this.authForm = this.fb.group<UserLoginDto>({
            email: '',
            password: ''
        })
    }

    submit() {
        const user = this.authForm.value
        console.log(user)
        this.authService.login({
            email: user.email,
            password: user.password
        })
    }
}
