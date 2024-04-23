import { Component, OnDestroy, OnInit } from '@angular/core';
import { generateCalendar } from '../../utils/generateCalendar';
import { CalendarService } from '../../sevices/calendar.service';
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { Day } from '../../model/day.interface';
import { TuiMonthPipe } from '../../pipes/TuiMonth.pipe';
import { Subject, takeUntil, tap } from 'rxjs';
import { CalendarDayComponent } from '../calendar-day/calendar-day.component';

@Component({
    standalone: true,
    imports: [
        DatePickerComponent,
        CalendarDayComponent,
        TuiMonthPipe
    ],
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnInit, OnDestroy {
    protected days: Day[] = [];
    protected month: { year: number, month: number };

    private destroy$: Subject<void> = new Subject<void>();

    constructor(private calendarService: CalendarService) {
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

    ngOnDestroy(): void {
        this.destroy$.next();
    }
}
