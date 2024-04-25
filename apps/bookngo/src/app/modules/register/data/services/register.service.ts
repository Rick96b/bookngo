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
        return this.http.post<{ token: string }>(`${this._baseUrl}/auth/signUp`, user)
            .pipe(
                tap(({ token }): void => {
                    this.authService.loginByToken(token);
                }),
                switchMap(({ token }) => {
                    const data = jwtDecode<{ email: string, id: number }>(token);
                    return this.addCompany({
                        name: user.companyName,
                        ceo: data.id,
                        departments: [],
                        employees: []
                    });
                })
            );

    }

    addCompany(company: CompanyInDto) {
        return this.http.post(`${this._baseUrl}/auth/signUp`, company)
            .pipe(
                catchError((err) => {
                    console.log(err);
                    return of(null);
                })
            );
    }
}
