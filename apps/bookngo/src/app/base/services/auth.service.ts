import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { UserLoginDto } from '@common';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _authState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


    public setAuthState(state: boolean): void {
        this._authState.next(state);
    }

    public getAuthState(): Observable<boolean> {
        return this._authState.asObservable();
    }

    constructor(private http: HttpClient) {
        if (localStorage.getItem('token')) {
            this.setAuthState(true);
        }
    }

    public login(user: UserLoginDto) {
        return this.http.post<{ token: string }>('http://localhost:3000/api/auth/signIn', user)
            .subscribe({
                next: (res: {token: string}): void => {
                    localStorage.setItem('token', res.token);
                    this.setAuthState(true);
                },
                error: (err) => console.error(err)
            });
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
