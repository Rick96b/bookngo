import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, map, mergeMap, switchMap, takeUntil, tap } from 'rxjs';
import { CompanyService, DestroyService, User, UserService, Vacation } from '@bookngo/base';
import { DepartmentService } from '../../../pages/home/services/department.service';
import { VacationsService } from '../data/vacations.service';
import * as dayjs from 'dayjs';
import * as isBetween from 'dayjs/plugin/isBetween';
import { CompensationDto } from '@common';
import { CompensationsService } from '../data/compensations.service';

@Injectable()
export class CalendarService {
    private _date$ = new BehaviorSubject<{ year: number, month: number }>({
        year: new Date().getFullYear(),
        month: new Date().getMonth()
    });
    private _vacations$ = new BehaviorSubject<Vacation[]>([]);
    private _compensations$ = new BehaviorSubject<CompensationDto[]>([]);

    constructor(
        private _departmentService: DepartmentService,
        private _vacationsService: VacationsService,
        private _companyService: CompanyService,
        private destroy$: DestroyService,
        private _userService: UserService,
        private _compensationsService: CompensationsService
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
                switchMap((users: User[]) => {
                    return forkJoin(this._vacationsService.getVacationsByUser(users), this._compensationsService.getVacationsByUser(users))
                }),
                tap(([vacations, compensations]): void => {
                    this._vacations$.next(vacations);
                    this._compensations$.next(compensations)
                }),
                takeUntil(this.destroy$)
            ).subscribe();
    }

    public getCompensationsByDate(year: number, month: number, day: number) {
        return this._compensations$.pipe(
            map(compensations => {
                const date = dayjs(new Date(year, month, day + 1));
                return compensations.filter(compensation => {
                    const startDate = dayjs(compensation.date);

                    const user = this._companyService.getActiveUser(compensation.employee);

                    return date.isSame(startDate);

                });
            }),
            map(compensations => {
                return compensations.map(compensation => {
                    const user = this._companyService.getActiveUser(compensation.employee) as User;
                    return {
                        user: user,
                        vacationStatus: 'Отгул'
                    };
                });
            })
        );
    }

    public getVacationsByDate(year: number, month: number, day: number) {
        return this._vacations$.pipe(
            map((vacations: Vacation[]) => {

                const date = dayjs(new Date(year, month, day + 1));
                return vacations.filter(vacation => {
                    const startDate = dayjs(vacation.startDate);
                    const endDate = dayjs(vacation.endDate);
                    const user = this._companyService.getActiveUser(vacation.employee);
                    return !!(date.isBetween(startDate, endDate, 'day', '[]') && user);
                });
            }),
            map(vacations => {
                return vacations.map(vacation => {
                    const user = this._companyService.getActiveUser(vacation.employee) as User;
                    return {
                        user: user,
                        vacationStatus: 'Отпуск'
                    };
                });
            })
        );
    }
}
