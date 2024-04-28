import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, filter, map, tap, catchError, of} from 'rxjs';
import {BASE_URL} from '../../modules/common/tokens/base-url.token';
import {Company, getRequestOptions, User} from '@bookngo/base';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private _users$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  private _company$ = new BehaviorSubject<Company | null>(null)

  constructor(@Inject(BASE_URL) private _baseUrl: string, private _httpClient: HttpClient) {
    this.fetchUsers()
      .pipe(
        tap((users: User[]) => this._users$.next(users)),
        catchError((err) => {
          console.error(err);
          return of(null);
        })
      ).subscribe();
  }

  public getMe(): Observable<User> {
    return this.fetchMe();
  }

  public getUser(userId: number): Observable<User | undefined> {
    return this._users$.pipe(
      map((users: User[]) => users.find((user: User)=> user.id === userId))
    );
  }

  public getAllUsers(): Observable<User[]> {
    return this._users$.asObservable()
  }

  private fetchUsers(): Observable<User[]> {
    return this._httpClient.get<User[]>(`${this._baseUrl}/users/getAll`, getRequestOptions());
  }

  private fetchMe(): Observable<User> {
    return this._httpClient.get<User>(`${this._baseUrl}/users/getOne`, getRequestOptions());
  }
}

