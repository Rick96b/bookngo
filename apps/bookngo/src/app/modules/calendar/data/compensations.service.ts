import { Inject, Injectable } from '@angular/core';
import { BASE_URL_TOKEN, User, Vacation } from '@bookngo/base';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable } from 'rxjs';
import { CompensationDto } from '@common';

@Injectable()
export class CompensationsService {

    constructor(@Inject(BASE_URL_TOKEN) private _baseUrl: string, private _httpClient: HttpClient) {
    }
    public getVacationsByUser(users: User[]): Observable<CompensationDto[]> {
        return forkJoin(users.map((user: User) => this.fetchCompensation(user.id)))
            .pipe(
                map((compensation: CompensationDto[][]) => {
                    return compensation.flat().filter((compensation: CompensationDto): boolean => compensation.status === 'approved')
                }),
            );
    }

    public fetchCompensation(userId: number): Observable<CompensationDto[]> {
        return this._httpClient.get<CompensationDto[]>(`${this._baseUrl}/compensation/user/${userId}`);
    }
}
