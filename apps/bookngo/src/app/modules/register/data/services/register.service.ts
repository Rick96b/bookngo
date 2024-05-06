import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserBaseInfoDto } from '@common';
import { Observable, tap } from 'rxjs';
import { AuthService, BASE_URL_TOKEN } from '@bookngo/base';


@Injectable({
    providedIn: 'root'
})
export class RegisterService {

    constructor(
        @Inject(BASE_URL_TOKEN) private _baseUrl: string,
        private http: HttpClient,
        private authService: AuthService
    ) {
    }

    //временная типизация
    registerUser(user: UserBaseInfoDto): Observable<null | object> {
        if(user.employmentStatus === 'employee') {
            return this.http.post<{ token: string }>(`${this._baseUrl}/auth/signUp/user`, user)
            .pipe(
                tap(({ token }): void => {
                    this.authService.loginByToken(token);
                })
            );
        } else {
            return this.http.post<{ token: string }>(`${this._baseUrl}/auth/signUp/ceo`, user)
            .pipe(
                tap(({ token }): void => {
                    this.authService.loginByToken(token);
                })
            );
        }

    }
}
