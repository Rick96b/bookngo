import { Inject, Injectable } from '@angular/core';
import { BASE_URL_TOKEN, CompanyService, User, Vacation } from '@bookngo/base';
import { BehaviorSubject, catchError, concatMap, Observable, of, tap, zip } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class NotificationsService {

    protected _vacationsRequestNotifications$: BehaviorSubject<Vacation[]> = new BehaviorSubject<Vacation[]>([]);
    protected _joinRequestsNotifications$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
    public isLoaded = false;

    public getVacationsRequestNotifications() {
        return this._vacationsRequestNotifications$.asObservable();
    }
    public getJoinRequestNotifications() {
        return this._joinRequestsNotifications$.asObservable();
    }

    constructor(@Inject(BASE_URL_TOKEN) private _baseUrl: string, private _httpClient: HttpClient,
                protected _companyService: CompanyService) {

    }

    public fetchNotifications(user: User) {
        if (user.employmentStatus === 'ceo') {
            return this.fetchAllNotifications();
        } else {
            return this.fetchAllNotifications();
        }
    }

    private fetchAllNotifications(): Observable<[Vacation[], User[]]> {

        return zip(this.fetchVacationsRequestNotifications(), this.fetchJoinRequestNotifications())
            .pipe(
                tap(([vacations, users]): void => {
                    this._vacationsRequestNotifications$.next(vacations);
                    this._joinRequestsNotifications$.next(users);
                    this.isLoaded = true;
                })
            )

    }

    private fetchVacationsRequestNotifications(): Observable<Vacation[]> {
        return this._httpClient.get<Vacation[]>(`${this._baseUrl}/vacations/getPendingVacations`);
    }
    private fetchJoinRequestNotifications(): Observable<User[]> {
        return this._httpClient.get<User[]>(`${this._baseUrl}/users/getPendingUsers`);
    }

    public sendStatusVacation(vacation: Vacation) {
        return this._httpClient.put<Vacation>(`${this._baseUrl}/vacations/updateStatus`, vacation);
    }

    public sendStatusUser(user: User) {
        return this._httpClient.put<Vacation>(`${this._baseUrl}/users/updateStatus`, user);
    }
}
