import { Component, OnInit } from '@angular/core';
import { generateCalendar } from '../../utils/generateCalendar';
import { CalendarService } from '../../sevices/calendar.service';
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { Day } from '../../model/day.interface';
import { TuiMonthPipe } from '../../pipes/TuiMonth.pipe';

@Component({
    standalone: true,
    imports: [
        DatePickerComponent,
        TuiMonthPipe
    ],
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnInit {
    days: Day[] = []
    month: {year: number, month: number}
    constructor(
        private calendarService: CalendarService
    ) {        

    }

    ngOnInit(): void { 
        this.calendarService.getDate$().subscribe((date) => {
            this.days = generateCalendar(date.year, date.month)
            this.month = date
        })
    }

    changeMonth({year, month}: {year: number, month: number}) {
        this.calendarService.setDate(year, month)
    }
}
