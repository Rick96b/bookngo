import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, tap, takeUntil } from 'rxjs';
import { BASE_URL_TOKEN, DestroyService, User } from '@bookngo/base';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private _authState = new BehaviorSubject<'Undefined' | 'Pending' | 'Approved'>('Undefined');

    constructor(@Inject(BASE_URL_TOKEN) private _baseUrl: string, private _httpClient: HttpClient) {
    }

    public updateAuthState(): Observable<User | null> {
        return this.getUser().pipe(
            tap(user => {
                if(user.status === 'approved') {
                    this._authState.next('Approved')
                }
                if(user.status === 'pending') {
                    this._authState.next('Pending')
                }
            }),
            catchError(() => {
                this._authState.next('Undefined')
                return of(null)
            }),
        )
    }

    public getAuthStateSnapshot(): 'Undefined' | 'Pending' | 'Approved' {
        return this._authState.getValue();
    }

    public getAuthState(): Observable<'Undefined' | 'Pending' | 'Approved'> {
        return this._authState.asObservable();
    }


    public setAuthState(state: 'Undefined' | 'Pending' | 'Approved'): void {
        this._authState.next(state);
    }

    public getAuthToken(): string {
        return localStorage.getItem('token')!;
    }

    public logout(): void {
        localStorage.removeItem('token');
        this.setAuthState('Undefined');
    }

    private getUser(): Observable<User> {
        return this._httpClient.get<User>(`${this._baseUrl}/users/getOne`);
    }
}
