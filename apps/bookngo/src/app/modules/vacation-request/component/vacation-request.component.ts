import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TuiDay } from '@taiga-ui/cdk';
import { TuiButtonModule } from '@taiga-ui/core';
import { TuiInputDateModule } from '@taiga-ui/kit';
import { UserService } from '../../../base/services/user.service';
import { VacationRequestApiService } from '../data/services/vacations-request-api.service';
import * as dayjs from 'dayjs';

@Component({
    standalone: true,
    imports: [
        ReactiveFormsModule,
        TuiInputDateModule,
        TuiButtonModule
    ],
    selector: 'app-vacation-request',
    templateUrl: './vacation-request.component.html',
    styleUrls: ['./vacation-request.component.scss'],
})
export class VacationRequestComponent implements OnInit {
    vacationForm: FormGroup
    constructor(
        private _fb: FormBuilder,
        private _vacationRequestApiService: VacationRequestApiService,
        private _userService: UserService
    ) { }

    ngOnInit(): void {
        this.vacationForm = this._fb.group<{start: TuiDay | null, end: TuiDay | null}>({
            start: null,
            end: null,
        })
    }

    onSubmit() {
        const me = this._userService.getMeSnapshot()
        const start = this.vacationForm.controls['start'].value
        const end = this.vacationForm.controls['end'].value
        this._vacationRequestApiService.sendRequest({
            employee: me.id,
             startDate: new Date(start.year, start.month, start.day + 1).toISOString(),
             endDate: new Date(end.year, end.month, end.day + 1).toISOString(),
        }).subscribe(console.log)
    }
}
