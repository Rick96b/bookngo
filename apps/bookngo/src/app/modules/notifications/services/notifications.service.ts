import { Inject, Injectable } from '@angular/core';
import { BASE_URL_TOKEN, CompanyService, User, Vacation } from '@bookngo/base';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class NotificationsService {

    protected _vacationsRequestNotifications: BehaviorSubject<Vacation[]> = new BehaviorSubject<Vacation[]>([]);
    public isLoaded = false

    public getVacationsRequestNotifications() {
        return this._vacationsRequestNotifications.asObservable();
    }

    constructor(@Inject(BASE_URL_TOKEN) private _baseUrl: string, private _httpClient: HttpClient,
                protected _companyService: CompanyService) {

    }

    public fetchNotifications(user: User) {
        if (user.employmentStatus === 'ceo') {
            return this.fetchAllNotifications()
        } else {
            return this.fetchAllNotifications()
        }
    }

    // пока только заявки на отпуск
    private fetchAllNotifications(): Observable<Vacation[]> {
      return this._httpClient.get<Vacation[]>(`${this._baseUrl}/vacations/getPendingVacations`)
          .pipe(
              tap((vacations: Vacation[]): void => {
                  this._vacationsRequestNotifications.next(vacations)
                  this.isLoaded = true;
              })
          )
    }

    public sendStatusVacation(vacation: Vacation) {
        return this._httpClient.put<Vacation>(`${this._baseUrl}/vacations/updateStatus`, vacation)
    }
}
