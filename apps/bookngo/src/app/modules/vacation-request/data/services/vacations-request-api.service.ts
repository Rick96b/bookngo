import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BASE_URL_TOKEN, Vacation } from '@bookngo/base';
import { VacationInDto } from '@common';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class VacationRequestApiService {
    constructor(@Inject(BASE_URL_TOKEN) private _baseUrl: string, private _httpClient: HttpClient,) {
    }

    public sendRequest(vacation: VacationInDto): Observable<Vacation> {
        return this._httpClient.post<Vacation>(`${this._baseUrl}/vacations/postVacation`, vacation)
    }
}
