import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TuiInputDateModule } from '@taiga-ui/kit';

@Component({
    standalone: true,
    imports: [
        ReactiveFormsModule,
        TuiInputDateModule
    ],
    selector: 'app-vacation-request',
    templateUrl: './vacation-request.component.html',
    styleUrls: ['./vacation-request.component.scss']
})
export class VacationRequestComponent implements OnInit {
    vacationForm: FormGroup
    constructor(
        private fb: FormBuilder
    ) { }

    ngOnInit(): void { 
        this.vacationForm = this.fb.group({
            start: '',
            end: '',
            comment: ''
        })
    }
}
