import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiInputModule } from '@taiga-ui/kit';

@Component({
    standalone: true,
    selector: 'app-name',
    templateUrl: './auth.component.html',
    imports: [
        TuiInputModule,
        TuiTextfieldControllerModule
    ],
    styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit {
    authForm: FormGroup
    constructor(
        private fb: FormBuilder,
    ){}

    ngOnInit(): void {
        this.authForm = this.fb.group({
            login: '',
            password: ''
        })
    }
}
