import { Injectable } from '@angular/core';
import { BehaviorSubject, map, switchMap, tap } from 'rxjs';
import { User, Vacation } from '@bookngo/base'
import { DepartmentService } from '../../../pages/home/services/department.service';
import { VacationsService } from '../data/vacations.service';
import { getDatesBetween } from '../utils/getDatesBetween';

@Injectable()
export class CalendarService {
    private _date$ = new BehaviorSubject<{year: number, month: number}>({year: 2000, month: 0});
    private _vacations$ = new BehaviorSubject<Record<string, User[]>>({})
    
    constructor(
        private _departmentService: DepartmentService,
        private _vacationsService: VacationsService
    ) {
        this._date$.next({year: 0, month: 0})
        this.fetchVacations()
    }

    public getDate$() {
        return this._date$.asObservable();
    }

    public setDate(year: number, month: number) {
        this._date$.next({year, month})
    }

    public setYear(year: number) {
        this._date$.next({...this._date$.getValue(), year: year})
    }

    public setMonth(month: number) {
        this._date$.next({...this._date$.getValue(), month: month})
    }

    private fetchVacations() {
        this._departmentService.getActiveUsers().pipe(
            switchMap(users => this._vacationsService.getVacationsByUser(users)),
            map(vacations => this.formatVacations(vacations)),
            tap(vacations => this._vacations$.next(vacations))
        )
    }

    private formatVacations(vacationsToFormat: {user: User, vacations: Vacation[]}[]) {
        let result: Record<string, User[]> = {}
        vacationsToFormat.forEach(vacations => {
            vacations.vacations.forEach(vacation => {
                getDatesBetween(vacation.startDate, vacation.endDate).forEach(date => {
                    result[date].push(vacations.user)
                })
            })
        })
        return result
    }
}