import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, filter, map, tap, catchError, of, switchMap } from 'rxjs';
import { BASE_URL } from '../../modules/common/tokens/base-url.token';
import { Company, getRequestOptions, User } from '@bookngo/base';

@Injectable({
    providedIn: 'root'
})
export class CompanyService {
    private _activeDepartment$: BehaviorSubject<string> = new BehaviorSubject<string>('');
    //private _me$ = new BehaviorSubject<User | null>(null);
    private _users$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
    private _company$ = new BehaviorSubject<Company | null>(null);

    constructor(@Inject(BASE_URL) private _baseUrl: string, private _httpClient: HttpClient) {
        this.fetchUsers()
            .pipe(
                tap((users: User[]) => this._users$.next(users)),
                catchError((err) => {
                    console.error(err);
                    return of(null);
                })
            ).subscribe();
        // this.fetchMe()
        //     .pipe(
        //         tap((user: User) => this._me$.next(user)),
        //         catchError((err) => {
        //             console.error(err);
        //             return of(null);
        //         })
        //     ).subscribe();
        // this.fetchCompany()
        //     .pipe(
        //         tap((company: Company) => this._company$.next(company)),
        //         catchError((err) => {
        //             console.error(err);
        //             return of(null);
        //         })
        //     ).subscribe();
    }

    // public getMe(): Observable<User | null> {
    //     return this._me$.asObservable();
    // }

    public getUser(userId: number): Observable<User | undefined> {
        return this._users$.pipe(
            map((users: User[]) => users.find((user: User) => user.id === userId))
        );
    }

    public getCompany(): Observable<Company | null> {
        return this._company$.asObservable();
    }

    public getAllUsers(): Observable<User[]> {
        return this._users$.asObservable();
    }

    public getActiveDepartment(): Observable<string> {
        return this._activeDepartment$.asObservable();
    }

    public setActiveDepartment(activeDepartment: string): void {
        this._activeDepartment$.next(activeDepartment);
    }

    private fetchUsers() {
        return this._httpClient.get<User[]>(`${this._baseUrl}/users/getAll`, getRequestOptions()) as Observable<User[]>;
    }

    private fetchMe() {
        return this._httpClient.get<User>(`${this._baseUrl}/users/getOne`, getRequestOptions());
    }

    private fetchCompany() {
        return this._httpClient.get<User>(`${this._baseUrl}/users/getOne`, getRequestOptions()).pipe(
            switchMap(user => this._httpClient.get<Company>(`${this._baseUrl}/company/${user.companyName}`))
        );
    }
}

