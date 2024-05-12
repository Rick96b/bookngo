import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '@bookngo/base';
import { FormatDayDatePipe } from '../pipes/format-day-date.pipe';
import { FormatMonthDatePipe } from '../../common/pipes/format-month-date.pipe';
import { FormatVacationDateDirective } from '../directives/format-vacation-date.directive';
import { SortDate } from '../pipes/sort-date.pipe';

@Component({
    selector: 'app-vacation-list',
    standalone: true,
    imports: [CommonModule, FormatDayDatePipe, FormatMonthDatePipe, SortDate, FormatVacationDateDirective],
    templateUrl: './vacation-list.component.html',
    styleUrl: './vacation-list.component.scss',
})
export class VacationListComponent {
    constructor(protected _userService: UserService) {
    }
}
