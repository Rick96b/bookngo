import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, filter, map, switchMap, tap } from 'rxjs';
import { CompanyService, User, Vacation } from '@bookngo/base'
import { DepartmentService } from '../../../pages/home/services/department.service';
import { VacationsService } from '../data/vacations.service';
import { getDatesBetween } from '../utils/getDatesBetween';
import * as dayjs from 'dayjs';
import * as isBetween from 'dayjs/plugin/isBetween'

@Injectable()
export class CalendarService {
    private _date$ = new BehaviorSubject<{year: number, month: number}>({year: 2000, month: 0});
    private _vacations$ = new BehaviorSubject<Vacation[]>([])
    
    constructor(
        private _departmentService: DepartmentService,
        private _vacationsService: VacationsService,
        private _companyService: CompanyService
    ) {
        this._date$.next({year: 2024, month: 4})
        this.fetchVacations()
        dayjs.extend(isBetween)
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
            tap(vacations => {
                this._vacations$.next(vacations)
            })
        ).subscribe()
    }

    public getVacationsByDate(year: number, month: number, day: number) {
        return this._vacations$.pipe(
            map(vacations => {
                const date = dayjs(new Date(year, month, day))
                return vacations.filter(vacation => {
                    const startDate = dayjs(vacation.startDate)
                    const endDate = dayjs(vacation.endDate)
                    const user = this._companyService.getUser(vacation.employee)
                    console.log(vacation, year, month, day, user)
                    if(date.isBetween(startDate, endDate, 'day', '[]') && user)  {
                        return true
                    }
                    return false
                })
            }),
            map(vacations => {
                return vacations.map(vacation => {
                    const user = this._companyService.getUser(vacation.employee) as User
                    return {
                        user: user,
                        vacationStatus: 'Отпуск'
                    }
                })
            })
        )
    }   
}