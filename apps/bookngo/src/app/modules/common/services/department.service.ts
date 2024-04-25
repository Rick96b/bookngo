import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { User } from '@bookngo/base';
import { generateColorForUser } from '../utils/generateColorForUser';
import { UserService } from '../../../base/services/user.service';

@Injectable({
    providedIn: 'root'
})
export class DepartmentService {
    private _department: string;
    private _users$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

    constructor(private _usersService: UserService) {
        this.fetchUsers();
    }
    public get department() {
        return this._department;
    }

    public set department(value: string) {
        this._department = value;
    }

    public getUsers(): Observable<User[]> {
        return this._users$.asObservable();
    }

    private fetchUsers(): void {
        this._usersService.getAllUsers()
            .pipe(
                tap((users: User[]): void => {
                        users.map((user: User) => user.color = generateColorForUser(user.id));
                        this._users$.next(users);
                    }
                ),
                catchError((err) => {
                    console.log(err);
                    return of(null);
                })
            )
            .subscribe();
    }
}
