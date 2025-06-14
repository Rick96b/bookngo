import { Component, Input, OnInit, signal, WritableSignal } from '@angular/core';
import { Day } from '../../model/day.interface';
import { CalendarService } from '../../sevices/calendar.service';
import { takeUntil, tap } from 'rxjs';
import { DestroyService, User } from '@bookngo/base';
import { TuiButtonModule, TuiDropdownModule } from '@taiga-ui/core';
import { TuiActiveZoneModule, TuiObscuredModule } from '@taiga-ui/cdk';
import { generateColorForUser } from '../../../common/utils/generateColorForUser';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
    standalone: true,
    imports: [
        TuiDropdownModule,
        TuiButtonModule,
        TuiActiveZoneModule,
        TuiObscuredModule,
        NgClass
    ],
    selector: 'app-calendar-day',
    templateUrl: './calendar-day.component.html',
    styleUrls: ['./calendar-day.component.scss'],
    providers: [DestroyService]
})
export class CalendarDayComponent implements OnInit {
    @Input()
    day: Day;

    public open = false;
    generateColorForUser = generateColorForUser;

    protected readonly isPassedDay: WritableSignal<boolean> = signal(false);

    onClick(): void {
        if (this.vacations.length || this.compensations.length) {
            this.open = !this.open;
        }
    }

    onObscured(obscured: boolean): void {
        if (obscured) {
            this.open = false;
        }
    }

    onActiveZone(active: boolean): void {
        this.open = active && this.open;
    }

    protected vacations: { user: User, vacationStatus: string }[] = [];
    protected compensations: { user: User, vacationStatus: string }[] = [];

    constructor(private _calendarService: CalendarService, private _routerRouter: Router, private destroy: DestroyService) {
    }

    ngOnInit(): void {
        this.getVacations();
        this.getCompensations();
        this.validateDay();
    }

    private getVacations() {
        this._calendarService.getVacationsByDate(this.day.year, this.day.month, this.day.day).pipe(
            tap(val => this.vacations = val),
            takeUntil(this.destroy)
        ).subscribe();
    }

    private getCompensations() {
        this._calendarService.getCompensationsByDate(this.day.year, this.day.month, this.day.day).pipe(
            tap(val => {
                this.compensations = val;
            }),
            takeUntil(this.destroy)
        ).subscribe();
    }

    protected navigateToProfile(userId: number) {
        this._routerRouter.navigate(['cabinet', 'profile', userId]);
    }

    private validateDay(): void {
        const dayDate: Date = new Date(this.day.year, this.day.month, this.day.day);
        const today: Date = new Date();

        today.setHours(0, 0, 0, 0);
        dayDate.setHours(0, 0, 0, 0);

        this.isPassedDay.set(dayDate >= today);
    }
}
