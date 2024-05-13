import { Inject, Injectable } from '@angular/core';
import { BASE_URL_TOKEN, CompanyService, User, UserService, Vacation } from '@bookngo/base';
import { BehaviorSubject, catchError, concatMap, map, Observable, of, tap, zip } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NotificationPutStatusDto } from '../../../../../../common/models/notification-put-status-dto.interface';

@Injectable()
export class NotificationsService {

    protected _vacationsRequestNotifications$: BehaviorSubject<Vacation[]> = new BehaviorSubject<Vacation[]>([]);
    protected _joinRequestsNotifications$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
    public isLoaded = false;

    public getVacationsRequestNotifications(): Observable<Vacation[]> {
        return this._vacationsRequestNotifications$.asObservable();
    }

    public getJoinRequestNotifications(): Observable<User[]> {
        return this._joinRequestsNotifications$.asObservable();
    }

    public getPendingUser(userId: number): User | undefined {
        return this._joinRequestsNotifications$.getValue().find((user: User): boolean => user.id === userId);
    }

    constructor(@Inject(BASE_URL_TOKEN) private _baseUrl: string, private _httpClient: HttpClient, private userService: UserService) {
    }

    public updateNotifications(user: User): Observable<boolean> {
        if (user.employmentStatus === 'ceo') {
            return this.getAllNotifications().pipe(map(() => true));
        } else {
            return this.getSomeNotifications().pipe(map(() => true));
        }
    }

    private getSomeNotifications(): Observable<[User, Vacation[]]> {
        // для обычного пользователя

        return zip(this.userService.getMe(), this.userService.getVacations())
            .pipe(
                tap(([user, vacations]): void => {
                    this._vacationsRequestNotifications$.next(vacations.filter(vacation => vacation.reviewStatus));
                    if (user.reviewStatus) {
                        this._joinRequestsNotifications$.next([user]);
                    }
                    this.isLoaded = true;
                })
            );
    }

    private getAllNotifications(): Observable<[Vacation[], User[]]> {
        // для ceo
        return zip(this.fetchVacationsRequestNotifications(), this.fetchJoinRequestNotifications())
            .pipe(
                tap(([vacations, users]): void => {
                    this._vacationsRequestNotifications$.next(vacations);
                    this._joinRequestsNotifications$.next(users);
                    this.isLoaded = true;
                })
            );

    }


    private fetchVacationsRequestNotifications(): Observable<Vacation[]> {
        return this._httpClient.get<Vacation[]>(`${this._baseUrl}/vacations/getPendingVacations`);
    }

    private fetchJoinRequestNotifications(): Observable<User[]> {
        return this._httpClient.get<User[]>(`${this._baseUrl}/users/getPendingUsers`);
    }

    public sendStatusVacation(dto: NotificationPutStatusDto) {
        return this._httpClient.put<Vacation>(`${this._baseUrl}/vacations/updateStatus`, dto);
    }

    public sendStatusUser(dto: NotificationPutStatusDto) {
        return this._httpClient.put<User>(`${this._baseUrl}/users/updateStatus`, dto);
    }





    public updateReviewStatusJoin(): Observable<User> {
        return this._httpClient.get<User>(`${this._baseUrl}/users/updateReviewStatus`);
    }

    public updateReviewStatusVacation(id: number): Observable<Vacation> {
        return this._httpClient.post<Vacation>(`${this._baseUrl}/vacations/updateReviewStatus`, {id});
    }
}
