import { Injectable } from '@angular/core';
import * as dayjs from 'dayjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CalendarService {
    private _date: {year: number, month: number}
    private date$ = new BehaviorSubject<{year: number, month: number}>({year: 2000, month: 0});

    constructor() {
        this._date = {year: dayjs().year(), month: dayjs().month()}
        this.date$.next(this._date)
    }

    public getDate$() {
        return this.date$.asObservable();
    }

    public setDate(year: number, month: number) {
        this._date = {year, month}
        this.date$.next(this._date)
    }

    public setYear(year: number) {
        this._date = {...this._date, year: year}
        this.date$.next(this._date)
    }

    public setMonth(month: number) {
        this._date = {...this._date, month: month}
        this.date$.next(this._date)
    }
}