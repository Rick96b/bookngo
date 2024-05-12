import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, mergeMap, Observable, tap } from 'rxjs';
import { BASE_URL_TOKEN, User, Vacation } from '@bookngo/base';
import { HttpClient } from '@angular/common/http';
import { zip } from 'rxjs/internal/operators/zip';

@Injectable()
export class UserService {

    private _me$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
    private _vacations$: BehaviorSubject<Vacation[]> = new BehaviorSubject<Vacation[]>([]);
    public isFetched = false;

    constructor(@Inject(BASE_URL_TOKEN) private _baseUrl: string, private _httpClient: HttpClient) {
    }

    public setVacations(vacation: Vacation): void {
        this._vacations$.next([...this._vacations$.value, vacation]);
    }

    public getMe(): Observable<User | null> {
        return this._me$.asObservable()!;
    }

    public getVacations(): Observable<Vacation[]> {
        return this._vacations$.asObservable();
    }

    public getMeSnapshot(): User {
        return this._me$.getValue()!;
    }

    public fetchMe(): Observable<User | null> {
        return this._httpClient.get<User>(`${this._baseUrl}/users/getOne`)
            .pipe(
                tap((user: User): void => {
                    this._me$.next(user);
                    this.isFetched = true;
                }),
                mergeMap( (user: User) => this.fetchVacations(user.id)),
                mergeMap(() => this.getMe())
            );
    }

    private fetchVacations(id: number): Observable<Vacation[]> {
        return this._httpClient.get<Vacation[]>(`${this._baseUrl}/vacations/user/${id}`).pipe(
            tap((vacations: Vacation[]) => this._vacations$.next(vacations))
        );
    }

    public updateMe(body: User): Observable<User> {
        return this._httpClient.put<User>(`${this._baseUrl}/users/updateOne`, body)
            .pipe(
                tap((user: User) => this._me$.next(user))
            );
    }
}
