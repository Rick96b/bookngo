import { Inject, Injectable } from '@angular/core';
import { BASE_URL_TOKEN, User, UserService, Vacation } from '@bookngo/base';
import { BehaviorSubject, map, Observable, tap, zip } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CompensationDto, NotificationPutStatusDto } from '@common';

@Injectable()
export class NotificationsService {

    protected _vacationsRequestNotifications$: BehaviorSubject<Vacation[]> = new BehaviorSubject<Vacation[]>([]);
    protected _joinRequestsNotifications$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
    protected _compensationRequestsNotifications$: BehaviorSubject<CompensationDto[]> = new BehaviorSubject<CompensationDto[]>([]);
    public isLoaded = false;

    public getVacationsRequestNotifications(): Observable<Vacation[]> {
        return this._vacationsRequestNotifications$.asObservable();
    }
    public getCompensationsRequestNotifications(): Observable<CompensationDto[]> {
        return this._compensationRequestsNotifications$.asObservable();
    }

    public getJoinRequestNotifications(): Observable<User[]> {
        return this._joinRequestsNotifications$.asObservable();
    }

    public deleteNotification(type : 'join' | 'vacation' | 'compensation', id: number) {
        switch (type) {
            case 'join': {
                this._joinRequestsNotifications$
                    .next([...this._joinRequestsNotifications$.getValue()
                        .filter((user: User): boolean => user.id !== id)])
                break;
            }
            case 'vacation': {
                this._vacationsRequestNotifications$
                    .next([...this._vacationsRequestNotifications$.getValue()
                        .filter((vacation: Vacation): boolean => vacation.id !== id)])
                break;
            }
            case 'compensation': {
                this._compensationRequestsNotifications$
                    .next([...this._compensationRequestsNotifications$.getValue()
                        .filter((compensation: CompensationDto): boolean => compensation.id !== id)])
                break;
            }

        }
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

    private getSomeNotifications(): Observable<[User, Vacation[], CompensationDto[]]> {
        // для обычного пользователя

        return zip(this.userService.getMe(), this.userService.getVacations(), this.userService.getCompensation())
            .pipe(
                tap(([user, vacations, compensation]): void => {
                    this._vacationsRequestNotifications$.next(vacations.filter(vacation => vacation.reviewStatus));
                    this._compensationRequestsNotifications$.next(compensation.filter(compensation => compensation.reviewStatus))

                    if (user.reviewStatus) {
                        this._joinRequestsNotifications$.next([user]);
                    }
                    this.isLoaded = true;
                })
            );
    }

    private getAllNotifications(): Observable<[Vacation[], User[], CompensationDto[]]> {
        // для ceo
        return zip(this.fetchVacationsRequestNotifications(), this.fetchJoinRequestNotifications(), this.fetchCompensationsRequestNotifications())
            .pipe(
                tap(([vacations, users, compensations]): void => {
                    this._vacationsRequestNotifications$.next(vacations);
                    this._joinRequestsNotifications$.next(users);
                    this._compensationRequestsNotifications$.next(compensations);
                    this.isLoaded = true;
                })
            );

    }


    private fetchVacationsRequestNotifications(): Observable<Vacation[]> {
        return this._httpClient.get<Vacation[]>(`${this._baseUrl}/vacations/getPendingVacations`);
    }
    private fetchCompensationsRequestNotifications(): Observable<CompensationDto[]> {
        return this._httpClient.get<CompensationDto[]>(`${this._baseUrl}/compensation/getPendingCompensations`);
    }

    private fetchJoinRequestNotifications(): Observable<User[]> {
        return this._httpClient.get<User[]>(`${this._baseUrl}/users/getPendingUsers`);
    }

    public sendStatusVacation(dto: NotificationPutStatusDto) {
        return this._httpClient.put<Vacation>(`${this._baseUrl}/vacations/updateStatus`, dto);
    }
    public sendStatusCompensation(dto: NotificationPutStatusDto) {
        return this._httpClient.put<CompensationDto>(`${this._baseUrl}/compensation/updateStatus`, dto);
    }

    public sendStatusUser(dto: NotificationPutStatusDto) {
        return this._httpClient.put<User>(`${this._baseUrl}/users/updateStatus`, dto);
    }

    public updateReviewStatusJoin(): Observable<User> {
        return this._httpClient.get<User>(`${this._baseUrl}/users/updateReviewStatus`);
    }

    public updateReviewStatusVacation(id: number): Observable<Vacation> {
        return this._httpClient.post<Vacation>(`${this._baseUrl}/vacations/updateReviewStatus`, { id });
    }
    public updateReviewStatusCompensation(id: number): Observable<CompensationDto> {
        return this._httpClient.post<CompensationDto>(`${this._baseUrl}/compensation/updateReviewStatus`, { id });
    }
}
