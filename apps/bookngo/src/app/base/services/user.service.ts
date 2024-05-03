import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { getRequestOptions, User } from '@bookngo/base';
import { BASE_URL } from '../../modules/common/tokens/base-url.token';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private _me$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
    public isFetched = false;

    constructor(@Inject(BASE_URL) private _baseUrl: string, private _httpClient: HttpClient) {
    }

    public getMe(): Observable<User | null> {
        return this._me$.asObservable();
    }

    public fetchMe(): Observable<User | null> {
        return this._httpClient.get<User>(`${this._baseUrl}/users/getOne`, getRequestOptions())
            .pipe(
                tap((user: User): void => {
                    this._me$.next(user);
                    this.isFetched = true;
                }),
                catchError((err) => {
                    console.error(err);
                    return of(null);
                })
            );

    }

    public updateMe(body: User): Observable<User | null> {
        return this._httpClient.put<User>(`${this._baseUrl}/users/updateOne`, body, getRequestOptions())
            .pipe(
                tap((user: User) => this._me$.next(user)),
                catchError((err) => {
                    console.error(err);
                    return of(null);
                })
            );
    }
}
