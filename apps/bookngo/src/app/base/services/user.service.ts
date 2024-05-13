import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, mergeMap, Observable, tap } from 'rxjs';
import { BASE_URL_TOKEN, User, Vacation } from '@bookngo/base';
import { HttpClient } from '@angular/common/http';
import { CompensationDto } from '@common';
import { zip } from 'rxjs/internal/operators/zip';

@Injectable()
export class UserService {

    private _me$: BehaviorSubject<User>;
    private _vacations$: BehaviorSubject<Vacation[]> = new BehaviorSubject<Vacation[]>([]);
    private _compensations$: BehaviorSubject<CompensationDto[]> = new BehaviorSubject<CompensationDto[]>([]);

    public isFetched = false;

    constructor(@Inject(BASE_URL_TOKEN) private _baseUrl: string, private _httpClient: HttpClient) {
    }

    public setVacations(vacation: Vacation): void {
        this._vacations$.next([...this._vacations$.value, vacation]);
    }
    public setCompensation(compensation: CompensationDto): void {
        this._compensations$.next([...this._compensations$.value, compensation]);
    }

    public getMe(): Observable<User> {
        return this._me$.asObservable()!;
    }

    public getVacations(): Observable<Vacation[]> {
        return this._vacations$.asObservable();
    }
    public getCompensation(): Observable<CompensationDto[]> {
        return this._compensations$.asObservable();
    }

    public getVacationById(vacationId: number): Vacation | undefined {
        return this._vacations$.value.find((vacation: Vacation): boolean => vacation.id === vacationId)
    }

    public getCompensationById(compensationId: number): CompensationDto | undefined {
        return this._compensations$.value.find((compensation: CompensationDto): boolean => compensation.id === compensationId)
    }

    public getMeSnapshot(): User {
        return this._me$.getValue()!;
    }

    public fetchMe(): Observable<User> {
        return this._httpClient.get<User>(`${this._baseUrl}/users/getOne`)
            .pipe(
                tap((user: User): void => {
                    this._me$ = new BehaviorSubject<User>(user);
                    this.isFetched = true;
                }),
                mergeMap( () =>  this.fetchVacations(this._me$.value.id)),
                mergeMap(() => this.fetchCompensations(this._me$.value.id)),
                mergeMap(() => this.getMe())
            );
    }

    private fetchVacations(id: number): Observable<Vacation[]> {
        return this._httpClient.get<Vacation[]>(`${this._baseUrl}/vacations/user/${id}`).pipe(
            tap((vacations: Vacation[]) => this._vacations$.next(vacations))
        );
    }

    private fetchCompensations(id: number): Observable<CompensationDto[]> {
        return this._httpClient.get<CompensationDto[]>(`${this._baseUrl}/compensation/user/${id}`).pipe(
            tap((compensation: CompensationDto[]) => this._compensations$.next(compensation))
        );
    }

    public updateMe(body: User): Observable<User> {
        return this._httpClient.put<User>(`${this._baseUrl}/users/updateOne`, body)
            .pipe(
                tap((user: User) => this._me$.next(user))
            );
    }
}
