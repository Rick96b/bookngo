import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, filter, map, switchMap } from 'rxjs';
import { BASE_URL } from '../../modules/common/tokens/base-url.token';
import { Company, getRequestOptions, User } from '@bookngo/base';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private _me$ = new BehaviorSubject<User | null>(null)
  private _users$ = new BehaviorSubject<User[]>([])
  private _company$ = new BehaviorSubject<Company | null>(null)
  
  constructor(private _httpClient: HttpClient, @Inject(BASE_URL) private _baseUrl: string) {
    this.fetchUsers().subscribe({
      next: (res) => this._users$.next(res)
    })
    this.fetchMe().subscribe({
      next: (res) => this._me$.next(res)
    })
    this.fetchCompany().subscribe({
      next: (res) => this._company$.next(res)
    })
  }

  public getMe(): Observable<User | null> {
    return this._me$.asObservable()
  }

  public getUser(userId: number): Observable<User | undefined> {
    return this._users$.pipe(
      map(users => users.find(user => user.id === userId))
    )
  }

  public getAllUsers(): Observable<User[]> {
    return this._users$.asObservable()
  }

  fetchUsers() {
    return this._httpClient.get<User[]>(`${this._baseUrl}/users/getAll`, getRequestOptions()) as Observable<User[]>;
  }

  fetchMe() {
    return this._httpClient.get<User>(`${this._baseUrl}/users/getOne`, getRequestOptions()) 
  }

  fetchCompany() {
    return this._httpClient.get<User>(`${this._baseUrl}/users/getOne`, getRequestOptions()).pipe(
      switchMap(user => this._httpClient.get<Company>(`${this._baseUrl}/company/company/:${user.companyName}`))
    )
  }
}

