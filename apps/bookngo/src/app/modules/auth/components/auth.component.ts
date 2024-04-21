import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TuiButtonModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiInputModule } from '@taiga-ui/kit';

@Component({
    standalone: true,
    selector: 'app-name',
    templateUrl: './auth.component.html',
    imports: [
        TuiInputModule,
        TuiTextfieldControllerModule,
        TuiButtonModule,
        ReactiveFormsModule
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

    submit() {
        console.log(this.authForm.value)
    }
}
