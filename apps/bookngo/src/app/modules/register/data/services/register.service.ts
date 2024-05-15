import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserBaseInfoDto } from '@common';
import { Observable, tap } from 'rxjs';
import { AuthService, BASE_URL_TOKEN } from '@bookngo/base';
import { Router } from '@angular/router';


@Injectable()
export class RegisterService {

    constructor(
        @Inject(BASE_URL_TOKEN) private _baseUrl: string, private httpClient: HttpClient,  private _authService: AuthService) {
    }

    public registerUser(registerData: UserBaseInfoDto): Observable<{ token: string }> {
        const path: string = registerData.employmentStatus === 'employee' ? 'user' : 'ceo';
        return this.httpClient.post<{ token: string }>(`${this._baseUrl}/auth/signUp/${path}`, {
            ...registerData,
            status: registerData.employmentStatus === 'ceo' ? 'approved' : 'pending'
        })
        .pipe(
            tap((token): void => {
                localStorage.setItem('token', token.token)
                if(registerData.employmentStatus === 'ceo') {
                    this._authService.setAuthState('Approved')
                } else {
                    this._authService.setAuthState('Pending')
                }
            })
        );
    }
}
