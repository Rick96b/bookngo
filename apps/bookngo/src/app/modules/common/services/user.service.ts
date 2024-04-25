import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../tokens/base-url.token';
import { User } from '@bookngo/base';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private _httpClient: HttpClient, @Inject(BASE_URL) private _baseUrl: string) {
    }

    public getUser(): Observable<User> {
        const token: string | null = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`
        };

        return this.sendRequest(`${this._baseUrl}/users/getOne`, headers) as Observable<User>;
    }

    public getAllUsers(): Observable<User[]> {
        const token: string | null = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${token}`,
        }

        return this.sendRequest(`${this._baseUrl}/users/getAll`, headers) as Observable<User[]>
    }

    private sendRequest(url: string, headers: {Authorization: string} ): Observable<User | User[]> {
        return this._httpClient.get<User | User[]>(url, {headers: headers})
    }
}

