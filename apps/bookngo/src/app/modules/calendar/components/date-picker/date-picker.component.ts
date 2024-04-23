import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { TuiCalendarMonthModule } from '@taiga-ui/kit';
import { TuiMonth } from '@taiga-ui/cdk';
import { TuiButtonModule, TuiHostedDropdownModule } from '@taiga-ui/core';
import * as dayjs from 'dayjs';

@Component({
    standalone: true,
    selector: 'app-date-picker',
    imports: [
        TuiCalendarMonthModule,
        TuiHostedDropdownModule,
        TuiButtonModule,
    ],
    templateUrl: './date-picker.component.html',
    styleUrl: './date-picker.component.scss'
})
export class DatePickerComponent {
    protected monthName: string
    protected open = false
    @Input() month: TuiMonth
    @Output() changeMonth = new EventEmitter<{year: number, month: number}>()

    ngOnChanges(changes: SimpleChanges): void {
        if(changes['month']) {
            this.monthName = dayjs(new Date(this.month.year, this.month.month)).format('MMMM')
        }
    }

    onMonthClick(month: TuiMonth): void {
        this.changeMonth.emit({year: month.year, month: month.month})
        this.handleDropdownClose()
    }

    onSwitcherClick(direction: 'inc' | 'dec') {
        const newMonth = {year: this.month.year, month: this.month.month}
        if(direction === 'inc') {
            if(newMonth.month == 11) {
                newMonth.month = 0
                newMonth.year += 1
            } else {
                newMonth.month += 1
            }
        } else {
            if(newMonth.month == 0) {
                newMonth.month = 11
                newMonth.year -= 1
            } else {
                newMonth.month -= 1
            }
        }
        this.changeMonth.emit({year: newMonth.year, month: newMonth.month})
    }
 
    handleDropdownClose() {
        this.open = false
    }

} 
