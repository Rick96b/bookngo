import { Component, Input, OnInit } from '@angular/core';
import { Day } from '../../model/day.interface';
import { CalendarService } from '../../sevices/calendar.service';
import { generate, tap } from 'rxjs';
import { User } from '@bookngo/base';
import { TuiButtonModule, TuiDropdownModule } from '@taiga-ui/core';
import { TuiActiveZoneModule, TuiObscuredModule } from '@taiga-ui/cdk';
import { generateColorForUser } from '../../../common/utils/generateColorForUser';
import { Router } from '@angular/router';

@Component({
    standalone: true,
    imports: [
        TuiDropdownModule,
        TuiButtonModule,
        TuiActiveZoneModule,
        TuiObscuredModule
    ],
    selector: 'app-calendar-day',
    templateUrl: './calendar-day.component.html',
    styleUrls: ['./calendar-day.component.scss'],
})
export class CalendarDayComponent implements OnInit {
    @Input() day: Day
    open = false;
	generateColorForUser = generateColorForUser
    onClick(): void {
        if(this.vacations.length) {
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

    vacations: {user: User, vacationStatus: string}[] = []
    constructor(private _calendarService: CalendarService, private _routerRouter: Router) { }

    ngOnInit(): void {
        this.getVacations()
    }

    private getVacations() {
        this._calendarService.getVacationsByDate(this.day.year, this.day.month, this.day.day).pipe(
            tap(val => this.vacations = val),
        ).subscribe()
    }

    protected navigateToProfile(userId: number) {
        this._routerRouter.navigate(['cabinet', 'profile', userId])
    }
}
