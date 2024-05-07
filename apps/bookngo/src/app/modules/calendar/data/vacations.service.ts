import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, map, Observable, tap } from 'rxjs';
import { Vacation } from '../../../base/interfaces';
import { BASE_URL_TOKEN, User } from '@bookngo/base';
import { DepartmentService } from '../../../pages/home/services/department.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class VacationsService {
    private _vacations$ = new BehaviorSubject<{date: number, employees: string[]}[]>([])

    constructor(
        private _departmentService: DepartmentService,
        @Inject(BASE_URL_TOKEN) private _baseUrl: string,
        private _httpClient: HttpClient
    ) {

    }

    public getVacationsByUser(users: User[]): Observable<Vacation[]> {
        return forkJoin(
            users.map(user => this.fetchVacations(user))
        ).pipe(
            tap(vacations => console.log(vacations)),
            map(vacations => vacations.flat())
        )
    }

    private fetchVacations(user: User) {
        return this._httpClient.get<Vacation[]>(`${this._baseUrl}/vacations/${user.id}`)
    }
}
