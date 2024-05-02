import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getRequestOptions, User } from '@bookngo/base';
import { BASE_URL } from '../../common/tokens/base-url.token';
import { catchError, Observable, of } from 'rxjs';

@Injectable()
export class UserInformationService {
    constructor(@Inject(BASE_URL) private _baseUrl: string, private _httpClient: HttpClient) {
    }

    public updateUser(dto: User): Observable<User | null> {
        return this._httpClient.put<User>(`${this._baseUrl}/users/updateOne`, dto, getRequestOptions())
            .pipe(
                catchError((err) => {
                    console.error(err);
                    return of(null);
                })
            );
    }
}
