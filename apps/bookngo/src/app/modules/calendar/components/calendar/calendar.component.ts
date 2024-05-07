import { Component, OnInit } from '@angular/core';
import { generateCalendar } from '../../utils/generateCalendar';
import { CalendarService } from '../../sevices/calendar.service';
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { Day } from '../../model/day.interface';
import { TuiMonthPipe } from '../../pipes/TuiMonth.pipe';
import { takeUntil, tap } from 'rxjs';
import { CalendarDayComponent } from '../calendar-day/calendar-day.component';
import { DestroyService } from '@bookngo/base';
import { VacationsService } from '../../data/vacations.service';

@Component({
    standalone: true,
    imports: [
        DatePickerComponent,
        CalendarDayComponent,
        TuiMonthPipe
    ],
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrl: './calendar.component.scss',
    providers: [CalendarService, VacationsService, DestroyService]
})
export class CalendarComponent implements OnInit {
    protected days: Day[] = [];
    protected month: { year: number, month: number };


    constructor(private calendarService: CalendarService, private destroy$: DestroyService) {
    }

    ngOnInit(): void {
        this.calendarService.getDate$().pipe(
            tap((date) => {
                this.days = generateCalendar(date.year, date.month);
                this.month = date;
            }),
            takeUntil(this.destroy$)
        ).subscribe();
    }

    changeMonth({ year, month }: { year: number, month: number }): void {
        this.calendarService.setDate(year, month);
    }
}
