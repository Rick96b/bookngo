import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Vacation, getRequestOptions } from '@bookngo/base';
import { BASE_URL_TOKEN } from '../../../common/tokens/base-url.token';
import { VacationInDto } from '@common';
import { catchError, of, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class VacationRequestApiService {
    constructor(@Inject(BASE_URL_TOKEN) private _baseUrl: string, private _httpClient: HttpClient) {

    }

    public sendRequest(vacation: VacationInDto) {
        console.log(vacation)
        this._httpClient.post(`${this._baseUrl}/vacations/postVacation`, vacation)
    }
}