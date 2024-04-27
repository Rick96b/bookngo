import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CompanyInDto, UserBaseInfoDto } from '@common';
import { jwtDecode } from 'jwt-decode';
import { catchError, Observable, of, switchMap, tap } from 'rxjs';
import { AuthService } from '@bookngo/base';
import { BASE_URL } from '../../../common/tokens/base-url.token';


@Injectable({
    providedIn: 'root'
})
export class RegisterService {

    constructor(
        @Inject(BASE_URL) private _baseUrl: string,
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
