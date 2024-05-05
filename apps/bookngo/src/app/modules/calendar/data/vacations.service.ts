import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, forkJoin, from, map, merge, mergeMap, tap } from 'rxjs';
import { Vacation } from '../../../base/interfaces';
import { User } from '@bookngo/base'
import { DepartmentService } from '../../../pages/home/services/department.service';
import { BASE_URL } from '../../common/tokens/base-url.token';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class VacationsService {
    private _vacations$ = new BehaviorSubject<{date: number, employees: string[]}[]>([])
    
    constructor(
        private _departmentService: DepartmentService,
        @Inject(BASE_URL) private _baseUrl: string, 
        private _httpClient: HttpClient
    ) {

    }

    public getVacationsByUser(users: User[]): Observable<{user: User, vacations: Vacation[]}[]> {
        return forkJoin(
            users.map(user => this.fetchVacations(user))
        )
    }

    private fetchVacations(user: User) {
        return this._httpClient.get<Vacation[]>(`${this._baseUrl}/vacations/${user.id}`).pipe(
            map(vacations => {return {user: user, vacations: vacations}})
        )
    }
}