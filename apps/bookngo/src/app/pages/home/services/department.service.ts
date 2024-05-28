import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, takeUntil, tap } from 'rxjs';
import { Company, CompanyService, DestroyService, User, UserService } from '@bookngo/base';

@Injectable()
export class DepartmentService {
    private _activeUsers$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([])
    private _activeDepartment$: BehaviorSubject<string> = new BehaviorSubject<string>(this._userService.getMeSnapshot().companyDepartment || '');
    private _allDepartments: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([])

    constructor(private _companyService: CompanyService, private destroy$: DestroyService, private _userService: UserService) {
       this.updateAllDepartments();
        this.updateActiveUsers();
    }

    private updateActiveUsers(): void {
        this._companyService.getUsersByDepartment(this._activeDepartment$.getValue())
            .pipe(
                tap((users : User[]) => this._activeUsers$.next(users)),
                takeUntil(this.destroy$)
            ).subscribe()
    }

    public updateAllDepartments(): void {
        this._companyService.getCompany().pipe(
            tap((company: Company | null): void => {
                if (company?.departments) {
                    this._allDepartments.next(company?.departments)
                }
            }),
            takeUntil(this.destroy$)
        ).subscribe();
    }

    public getActiveDepartment(): Observable<string> {
        return this._activeDepartment$.asObservable();
    }

    public getActiveDepartmentSnapshot(): string {
        return this._activeDepartment$.getValue();
    }

    public setActiveDepartment(activeDepartment: string): void {
        this._activeDepartment$.next(activeDepartment);
        this.updateActiveUsers();
    }

    getActiveUsers(): Observable<User[]> {
        return this._activeUsers$.asObservable()
    }

    public getAllDepartments(): Observable<string[]> {
        return this._allDepartments.asObservable();
    }
}
