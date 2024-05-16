import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyService, DestroyService, UserService, Vacation } from '@bookngo/base';
import { FormatDayDatePipe } from '../pipes/format-day-date.pipe';
import { FormatMonthDatePipe } from '../pipes/format-month-date.pipe';
import { FormatVacationDateDirective } from '../directives/format-vacation-date.directive';
import { SortDate } from '../pipes/sort-date.pipe';
import { map, takeUntil, tap } from 'rxjs';
import { VacationsService } from '../../calendar/data/vacations.service';

@Component({
    selector: 'app-vacation-list',
    standalone: true,
    imports: [CommonModule, FormatDayDatePipe, FormatMonthDatePipe, SortDate, FormatVacationDateDirective],
    templateUrl: './vacation-list.component.html',
    styleUrl: './vacation-list.component.scss',
    providers: [DestroyService, VacationsService]
})
export class VacationListComponent implements OnInit {

    @Input({ alias: 'userId' }) userId: number;
    protected vacations: Vacation[] = [];

    constructor(protected _userService: UserService, private destroy$: DestroyService, private _companyService: CompanyService, private _vacationService: VacationsService) {
    }

    ngOnInit(): void {
        if (!this.userId || this.userId === this._userService.getMeSnapshot().id) {
            this._userService.getVacations()
                .pipe(
                    map((vacations: Vacation[]) => vacations.filter((vacation: Vacation): boolean => vacation.status === 'approved')),
                    tap((vacation: Vacation[]) => this.vacations = vacation),
                    takeUntil(this.destroy$)
                ).subscribe();
        } else {
            this._vacationService.fetchVacations(this.userId)
                .pipe(
                    map((vacations: Vacation[]) => vacations.filter((vacation: Vacation): boolean => vacation.status === 'approved')),
                    tap((vacations: Vacation[]) => this.vacations = vacations),
                    takeUntil(this.destroy$)
                ).subscribe();
        }
    }

    protected trackByFn(index: number, item: Vacation) {
        return item.id;
    }
}
