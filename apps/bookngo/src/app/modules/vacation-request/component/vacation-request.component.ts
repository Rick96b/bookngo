import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TuiDay } from '@taiga-ui/cdk';
import { TuiButtonModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiInputDateModule } from '@taiga-ui/kit';
import { UserService } from '../../../base/services/user.service';
import { VacationRequestApiService } from '../data/services/vacations-request-api.service';
import { DestroyService, User, Vacation } from '@bookngo/base';
import { takeUntil, tap } from 'rxjs';

@Component({
    standalone: true,
    imports: [
        ReactiveFormsModule,
        TuiInputDateModule,
        TuiButtonModule,
        TuiTextfieldControllerModule
    ],
    selector: 'app-vacation-request',
    templateUrl: './vacation-request.component.html',
    styleUrls: ['./vacation-request.component.scss'],
    providers: [DestroyService]
})
export class VacationRequestComponent implements OnInit {
    vacationForm: FormGroup;
    protected nowDay: TuiDay;
    protected maxDay: TuiDay;


    constructor(
        private _fb: FormBuilder,
        private _vacationRequestApiService: VacationRequestApiService,
        private _userService: UserService,
        private destroy$: DestroyService
    ) {
        const  date: Date = new Date();
        this.nowDay = new TuiDay(date.getFullYear(), date.getMonth(), date.getDate());
    }

    ngOnInit(): void {
        this.vacationForm = this._fb.group<{ start: TuiDay | null, end: TuiDay | null }>({
            start: null,
            end: null
        });

        this.vacationForm.controls['start'].valueChanges
            .pipe(
                tap((value: TuiDay): void => {
                    this.maxDay = value.append({ day: this._userService.getMeSnapshot().accumulatedVacationDays });
                    this.nowDay = value
                }),
                takeUntil(this.destroy$)
            ).subscribe()
    }

    public onSubmit(): void {
        const me: User = this._userService.getMeSnapshot();
        const start = this.vacationForm.controls['start'].value;
        const end = this.vacationForm.controls['end'].value;
        this._vacationRequestApiService.sendRequest({
            employee: me.id,
            startDate: new Date(start.year, start.month, start.day + 1).toISOString(),
            endDate: new Date(end.year, end.month, end.day + 1).toISOString()
        }).pipe(
            tap((vacation: Vacation) => this._userService.setVacations(vacation)),
            takeUntil(this.destroy$)
        ).subscribe();
        //временно
    }
}
