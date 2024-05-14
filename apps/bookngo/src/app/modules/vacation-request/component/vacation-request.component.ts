import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TuiDay } from '@taiga-ui/cdk';
import { TuiButtonModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiDataListWrapperModule, TuiInputDateModule, TuiSelectModule } from '@taiga-ui/kit';
import { VacationRequestApiService } from '../data/services/vacations-request-api.service';
import { DestroyService, User, UserService, Vacation } from '@bookngo/base';
import { catchError, of, takeUntil, tap } from 'rxjs';
import { NgIf } from '@angular/common';

@Component({
    standalone: true,
    imports: [
        ReactiveFormsModule,
        TuiInputDateModule,
        TuiButtonModule,
        TuiTextfieldControllerModule,
        NgIf,
        TuiDataListWrapperModule,
        TuiSelectModule
    ],
    selector: 'app-vacation-request',
    templateUrl: './vacation-request.component.html',
    styleUrls: ['./vacation-request.component.scss'],
    providers: [DestroyService]
})
export class VacationRequestComponent implements OnInit {
    protected vacationForm: FormGroup;
    protected nowDay: TuiDay;
    protected maxDay: TuiDay;
    protected items: string[] = [
        'Отпуск',
        'Отгул'
    ];


    constructor(
        private _fb: FormBuilder,
        private _vacationRequestApiService: VacationRequestApiService,
        protected _userService: UserService,
        private destroy$: DestroyService
    ) {
        const date: Date = new Date();
        this.nowDay = new TuiDay(date.getFullYear(), date.getMonth(), date.getDate());
    }

    ngOnInit(): void {
        this.vacationForm = this._fb.group<{
            start: TuiDay | null,
            end: TuiDay | null,
            missType: string,
            date: TuiDay | null
        }>({
            missType: this.items[1],
            start: null,
            end: null,
            date: null
        });

        this.vacationForm.controls['start'].valueChanges
            .pipe(
                tap((value: TuiDay): void => {
                    this.maxDay = value.append({ day: this._userService.getMeSnapshot().accumulatedVacationDays - 1 });
                    this.nowDay = value;
                }),
                takeUntil(this.destroy$)
            ).subscribe();
    }

    public onSubmit(): void {
        const me: User = this._userService.getMeSnapshot();

        if (this.vacationForm.controls['missType'].value === 'Отпуск') {
            const start = this.vacationForm.controls['start'].value;
            const end = this.vacationForm.controls['end'].value;
            if (start && end) {
                this._vacationRequestApiService.sendVacationRequest({
                    employee: me.id,
                    startDate: new Date(start.year, start.month, start.day + 1).toISOString(),
                    endDate: new Date(end.year, end.month, end.day + 1).toISOString()
                }).pipe(
                    takeUntil(this.destroy$)
                ).subscribe();
            }

        } else {
            const date = this.vacationForm.controls['date'].value;
            if (date) {
                this._vacationRequestApiService.sendCompensationRequest({
                    employee: me.id,
                    date: new Date(date.year, date.month, date.day + 1).toISOString()
                }).pipe(
                    takeUntil(this.destroy$)
                ).subscribe();
            }

        }
    }
}
