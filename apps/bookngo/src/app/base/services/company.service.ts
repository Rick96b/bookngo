import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL_TOKEN, Company, DestroyService, User, UserService } from '@bookngo/base';
import { BehaviorSubject, map, mergeMap, Observable, of, takeUntil, tap } from 'rxjs';
import { AddDepartmentDto } from '@common';

@Injectable()
export class CompanyService {
    private _company$: BehaviorSubject<Company | null> = new BehaviorSubject<Company | null>(null);
    private _companyUsers$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
    public isFetched = false;

    constructor(@Inject(BASE_URL_TOKEN) private _baseUrl: string, private _httpClient: HttpClient, private destroy$: DestroyService, private userService: UserService) {
        this.userService.fetchMe().pipe(
            mergeMap((user: User | null) => this.fetchCompanyData(user!.companyName))
        );
    }

    public fetchCompanyData(companyName: string): Observable<User[]> {
        return this.fetchCompany(companyName).pipe(
            mergeMap((company: Company) => this.fetchUsers(company.employees.concat(company.ceo)))
        );
    }

    private fetchCompany(companyName: string): Observable<Company> {
        return this._httpClient.get<Company>(`${this._baseUrl}/company/${companyName}`).pipe(
            tap((company: Company) => this._company$.next(company))
        );
    }

    private fetchUsers(usersId: number[]): Observable<User[]> {
        return this._httpClient.post<User[]>(`${this._baseUrl}/users/getUsersById`, { id: usersId }).pipe(
            tap((users: User[]): void => {
                this._companyUsers$.next(users);
                this.isFetched = true;
            })
        );
    }

    private postDepartment(department: string): Observable<AddDepartmentDto> {
        return this._httpClient.put<AddDepartmentDto>(`${this._baseUrl}/company/addDepartment`,
            { companyId: this._company$.getValue()?.id, department: department });
    }

    public getCompany(): Observable<Company | null> {
        return this._company$.asObservable();
    }


    public getActiveUser(id: number): User | undefined {
       return this._companyUsers$.value.find((user: User): boolean => user.id == id);
    }

    public getUsersByDepartment(department: string): Observable<User[]> {
        if (!department || !this._company$.getValue()?.departments.includes(department)) {
            return this._companyUsers$.asObservable();
        }

        return this._companyUsers$.pipe(
            map((users: User[]) => users.filter((user: User): boolean => user.companyDepartment === department))
        );
    }

    public getUsers(): Observable<User[]> {
        return this._companyUsers$.asObservable();
    }

    public addDepartment(department: string): void {
        const oldCompany: Company = this._company$.getValue()!;
        this.postDepartment(department).pipe(
            tap(() => this._company$.next({ ...oldCompany, departments: [...oldCompany.departments, department] })),
            takeUntil(this.destroy$)
        ).subscribe();
    }
}

