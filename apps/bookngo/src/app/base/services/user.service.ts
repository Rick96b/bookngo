import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { BASE_URL_TOKEN, User } from '@bookngo/base';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private _me$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
    public isFetched = false;
    constructor(@Inject(BASE_URL_TOKEN) private _baseUrl: string, private _httpClient: HttpClient) {
    }

    public getMe(): Observable<User | null> {
        return this._me$.asObservable();
    }

    public getMeSnapshot(): User  {
        return this._me$.getValue()!;
    }

    public fetchMe(): Observable<User> {
        return this._httpClient.get<User>(`${this._baseUrl}/users/getOne`)
            .pipe(
                tap((user: User): void => {
                    this._me$.next(user);
                    this.isFetched = true;
                })
            );

    }

    public updateMe(body: User): Observable<User> {
        return this._httpClient.put<User>(`${this._baseUrl}/users/updateOne`, body)
            .pipe(
                tap((user: User) => this._me$.next(user))
            );
    }
}
