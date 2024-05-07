import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BASE_URL_TOKEN } from '@bookngo/base';
import { VacationInDto } from '@common';

@Injectable({
    providedIn: 'root'
})
export class VacationRequestApiService {
    constructor(@Inject(BASE_URL_TOKEN) private _baseUrl: string, private _httpClient: HttpClient) {

    }

    public sendRequest(vacation: VacationInDto) {
        console.log(vacation)
        return this._httpClient.post(`${this._baseUrl}/vacations/postVacation`, vacation)
    }
}
