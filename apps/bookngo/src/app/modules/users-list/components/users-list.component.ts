import { Component, OnDestroy, OnInit } from '@angular/core';
import { User, Company } from '@bookngo/base';
import { Subject, takeUntil, tap } from 'rxjs';
import { TuiAvatarModule, TuiDataListWrapperModule, TuiSelectModule } from '@taiga-ui/kit';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CompanyService } from '@bookngo/base'
import { TuiTextfieldControllerModule } from '@taiga-ui/core';

@Component({
    standalone: true,
    imports: [
        TuiAvatarModule,
        TuiSelectModule,
        CommonModule,
        TuiDataListWrapperModule,
        ReactiveFormsModule,
        TuiTextfieldControllerModule
    ],
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnDestroy {
    protected users$: User[];
    protected company$: Company | null
    protected activeDepartment$: string
    private destroy$: Subject<void> = new Subject<void>();

    filterForm: FormGroup

    constructor(private companyService: CompanyService) {
        this.filterForm = new FormGroup({
            departments: new FormControl('')
        })
    }

    ngOnInit(): void {
        this.companyService.getAllUsers().pipe(
            tap((users) => {
                this.users$ = users;
            }),
            takeUntil(this.destroy$)
        ).subscribe();
        this.companyService.getCompany().pipe(
            tap((company) => {
                this.company$ = company
            }),
            takeUntil(this.destroy$)
        ).subscribe();
        this.companyService.getActiveDepartment().pipe(
            tap((department) => {
                this.activeDepartment$ = department
            }),
            takeUntil(this.destroy$)
        )
    }

    ngOnDestroy(): void {
        this.destroy$.next();
    }
}
