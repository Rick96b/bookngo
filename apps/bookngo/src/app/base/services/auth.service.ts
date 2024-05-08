import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { UserLoginDto } from '@common';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { BASE_URL_TOKEN } from '../tokens';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _authState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    public setAuthState(state: boolean): void {
        this._authState.next(state);
    }

    public getAuthStateSnapshot(): boolean {
        return this._authState.getValue();
    }

    constructor(@Inject(BASE_URL_TOKEN) private _baseUrl: string, private httpClient: HttpClient) {
        if (localStorage.getItem('token')) {
            this.setAuthState(true);
        }
    }

    public getAuthToken(): string {
        return localStorage.getItem('token')!;
    }

    public login(user: UserLoginDto): Observable<{ token: string }> {
        return this.httpClient.post<{ token: string }>(`${this._baseUrl}/auth/signIn`, user)
            .pipe(
                tap((res: { token: string }): void => {
                    localStorage.setItem('token', res.token);
                    this.setAuthState(true);
                }),
                catchError(err => {
                    console.log(err);
                    return throwError(err);
                })
            );
    }

    public logout() {
        localStorage.removeItem('token');
        this.setAuthState(false);
    }

    public loginByToken(token: string) {
        localStorage.setItem('token', token);
        this.setAuthState(true);
    }
}
