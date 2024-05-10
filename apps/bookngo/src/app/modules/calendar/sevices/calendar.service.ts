import { Injectable } from '@angular/core';
import { BehaviorSubject, map, switchMap, takeUntil, tap } from 'rxjs';
import { CompanyService, DestroyService, User, UserService, Vacation } from '@bookngo/base';
import { DepartmentService } from '../../../pages/home/services/department.service';
import { VacationsService } from '../data/vacations.service';
import * as dayjs from 'dayjs';
import * as isBetween from 'dayjs/plugin/isBetween';

@Injectable()
export class CalendarService {
    private _date$ = new BehaviorSubject<{ year: number, month: number }>({
        year: new Date().getFullYear(),
        month: new Date().getMonth()
    });
    private _vacations$ = new BehaviorSubject<Vacation[]>([]);

    constructor(
        private _departmentService: DepartmentService,
        private _vacationsService: VacationsService,
        private _companyService: CompanyService,
        private destroy$: DestroyService,
        private _userService: UserService
    ) {
        this.fetchVacations();
        dayjs.extend(isBetween);
    }

    public getDate$() {
        return this._date$.asObservable();
    }

    public setDate(year: number, month: number) {
        this._date$.next({ year, month });
    }

    public setYear(year: number) {
        this._date$.next({ ...this._date$.getValue(), year: year });
    }

    public setMonth(month: number) {
        this._date$.next({ ...this._date$.getValue(), month: month });
    }

    private fetchVacations(): void {
        this._departmentService.getActiveUsers()
            .pipe(
                switchMap((users: User[]) => this._vacationsService.getVacationsByUser(users)),
                tap((vacations: Vacation[]): void => {
                    this._vacations$.next(vacations);
                }),
                takeUntil(this.destroy$)
            ).subscribe();


    }

    public getVacationsByDate(year: number, month: number, day: number) {
        return this._vacations$.pipe(
            map(vacations => {
                const date = dayjs(new Date(year, month, day));
                return vacations.filter(vacation => {
                    const startDate = dayjs(vacation.startDate);
                    const endDate = dayjs(vacation.endDate);
                    const user = this._companyService.getUser(vacation.employee);
                    if (date.isBetween(startDate, endDate, 'day', '[]') && user) {
                        return true;
                    }
                    return false;
                });
            }),
            map(vacations => {
                return vacations.map(vacation => {
                    const user = this._companyService.getUser(vacation.employee) as User;
                    return {
                        user: user,
                        vacationStatus: 'Отпуск'
                    };
                });
            })
        );
    }
}
