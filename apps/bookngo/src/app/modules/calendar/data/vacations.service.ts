import { Inject, Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { Vacation } from '../../../base/interfaces';
import { BASE_URL_TOKEN, User } from '@bookngo/base';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class VacationsService {
    constructor(@Inject(BASE_URL_TOKEN) private _baseUrl: string, private _httpClient: HttpClient) {
    }

    public getVacationsByUser(users: User[]): Observable<Vacation[]> {
        return forkJoin(
            users.map((user: User) => this.fetchVacations(user))
        ).pipe(
            map((vacations: Vacation[][]) => vacations.flat())
        )
    }

    private fetchVacations(user: User): Observable<Vacation[]> {
        return this._httpClient.get<Vacation[]>(`${this._baseUrl}/vacations/${user.id}`)
    }
}
