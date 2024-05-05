import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, filter, Observable, of, tap } from 'rxjs';
import { CompanyService, getRequestOptions, User } from '@bookngo/base';
import { BASE_URL } from '../../../modules/common/tokens/base-url.token';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DepartmentService {
    private _activeUsers$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([])
    private _activeDepartment$: BehaviorSubject<string> = new BehaviorSubject<string>('');

    constructor(private _companyService: CompanyService) {
        this.updateActiveUsers()
    }

    public getActiveDepartment(): Observable<string> {
        return this._activeDepartment$.asObservable();
    }

    public setActiveDepartment(activeDepartment: string): void {
        this._activeDepartment$.next(activeDepartment);
        this.updateActiveUsers()
    }

    private updateActiveUsers(): void {
        this._companyService.getUsersByDepartment(this._activeDepartment$.getValue())
        .pipe(

            tap(users => this._activeUsers$.next(users))
        ).subscribe()
    }

    getActiveUsers(): Observable<User[]> {
        return this._activeUsers$.asObservable()
    }
}
