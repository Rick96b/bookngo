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
        return forkJoin(users.map((user: User) => this.fetchVacations(user.id)))
            .pipe(
                map((vacations: Vacation[][]) => {
                    return vacations.flat().filter((vacation: Vacation): boolean => vacation.status === 'approved')
                }),
            );
    }

    public fetchVacations(userId: number): Observable<Vacation[]> {
        return this._httpClient.get<Vacation[]>(`${this._baseUrl}/vacations/user/${userId}`);
    }
}
