import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { User } from '@prisma/client';
import { Observable } from 'rxjs';
import { BASE_URL } from '../../../modules/common/tokens/base-url.token';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    constructor(private _httpClient: HttpClient, @Inject(BASE_URL) private _baseUrl: string) {
    }

    public getUser(): Observable<HttpEvent<User>> {
        const token: string | null = localStorage.getItem('token');
        const options = {
            headers: { Authorization: `Bearer ${token}` }
        };
        return this.sendRequest(`${this._baseUrl}/users/getOne`, options);
    }

    public getAllUsers() {
        const token: string | null = localStorage.getItem('token');
        const options = {
            headers: { Authorization: `Bearer ${token}` }
        };
         this.sendRequest(`${this._baseUrl}/users/getAll`, options);
    }

    private sendRequest(url: string, options: any): Observable<HttpEvent<User>> {
        return this._httpClient.get<User>(url, options);
    }
}
