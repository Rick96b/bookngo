import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { UserLoginDto } from '@common';
import { Observable, tap } from 'rxjs';
import { AuthService, BASE_URL_TOKEN } from '@bookngo/base';

@Injectable()
export class LoginService {

    constructor(@Inject(BASE_URL_TOKEN) private _baseUrl: string, private _httpClient: HttpClient, private _authService: AuthService) {
    }
    public login(loginDto: UserLoginDto): Observable<{ token: string }> {
        return this._httpClient.post<{ token: string }>(`${this._baseUrl}/auth/signIn`, loginDto)
            .pipe(
                tap((res: { token: string }): void => {
                    localStorage.setItem('token', res.token);
                    this._authService.setAuthState(true);
                })
            );
    }
}
