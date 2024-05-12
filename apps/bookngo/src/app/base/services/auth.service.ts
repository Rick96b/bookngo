import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private _authState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor() {
        if (localStorage.getItem('token')) {
            this.setAuthState(true);
        }
    }

    public getAuthStateSnapshot(): boolean {
        return this._authState.getValue();
    }

    public getAuthState(): Observable<boolean> {
        return this._authState.asObservable();
    }


    public setAuthState(state: boolean): void {
        this._authState.next(state);
    }

    public getAuthToken(): string {
        return localStorage.getItem('token')!;
    }

    public logout(): void {
        localStorage.removeItem('token');
        this.setAuthState(false);
    }

    public loginByToken(token: string): void {
        localStorage.setItem('token', token);
        this.setAuthState(true);
    }
}
