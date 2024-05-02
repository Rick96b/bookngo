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
    public rnd: number;
    constructor(@Inject(BASE_URL) private _baseUrl: string, private _httpClient: HttpClient) {
        this.rnd = Math.floor(Math.random() * 1000)
        console.log('init service')
    }
    public fetchMe(): Observable<User | null> {
        console.log('1231231231');
        return this._httpClient.get<User>(`${this._baseUrl}/users/getOne`, getRequestOptions()).pipe(
            tap((user: User) => {
                this._me$.next(user);
            }),
            catchError((err) => {
                console.error(err);
                return of(null);
            })
        )
    }
    public getMe(): Observable<User | null> {
        console.log(this._me$.getValue())
        console.log( ' getMe')
        return this._me$.asObservable();
    }

    public updateMe(data: User | null): void {
         this._me$.next(data)
        console.log(this._me$.getValue())

        console.log('update')
    }
}
