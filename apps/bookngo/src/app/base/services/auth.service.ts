import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BASE_URL_TOKEN } from '../tokens';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _authState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(@Inject(BASE_URL_TOKEN) private _baseUrl: string, private httpClient: HttpClient) {
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


    public logout() {
        localStorage.removeItem('token');
        this.setAuthState(false);
    }

    public loginByToken(token: string) {
        localStorage.setItem('token', token);
        this.setAuthState(true);
    }
}
