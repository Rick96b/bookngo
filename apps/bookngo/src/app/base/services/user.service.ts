import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../../modules/common/tokens/base-url.token';
import { getRequestOptions, User } from '@bookngo/base';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private _httpClient: HttpClient, @Inject(BASE_URL) private _baseUrl: string) {
  }

  public getUser(): Observable<User> {
    return this.sendRequest(`${this._baseUrl}/users/getOne`) as Observable<User>;
  }

  public getAllUsers(): Observable<User[]> {
    return this.sendRequest(`${this._baseUrl}/users/getAll`) as Observable<User[]>;
  }

  private sendRequest(url: string): Observable<User | User[]> {
    return this._httpClient.get<User | User[]>(url, getRequestOptions());
  }
}

