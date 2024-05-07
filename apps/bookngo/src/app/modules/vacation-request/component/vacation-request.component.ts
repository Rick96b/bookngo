import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TuiDay } from '@taiga-ui/cdk';
import { TuiButtonModule } from '@taiga-ui/core';
import { TuiInputDateModule } from '@taiga-ui/kit';
import { UserService } from '../../../base/services/user.service';
import { tap } from 'rxjs';
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
        this._vacationRequestApiService.sendRequest({
            employee: 1,
            startDate: dayjs(this.vacationForm.controls['start'].value).format('YYYY-MM-DD'), 
            endDate: dayjs(this.vacationForm.controls['end'].value).format('YYYY-MM-DD'),
        })
    }
}
