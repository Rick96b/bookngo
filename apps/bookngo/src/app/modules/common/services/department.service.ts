import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User, requestOptions } from '@bookngo/base'
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class DepartmentService {
    private _department: string
    private _users$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([])

    constructor(
        private http: HttpClient
    ) {
        this.fetchUsers()
    }

    public get department() {
        return this._department
    }

    public getUsers$() {
        return this._users$.asObservable()
    }

    public set department(value: string) {
        this._department = value
    }

    private fetchUsers() {
        this.http.get<User[]>('http://localhost:3000/api/users/getAll', requestOptions)
        .subscribe({
            next: (res: User[]): void => {
                this._users$.next(res);
            },
            error: (err) => console.error(err)
        });
    }
}