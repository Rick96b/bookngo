import { Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
import { User, Company } from '@bookngo/base';
import { Subject, takeUntil, tap } from 'rxjs';
import { TuiAvatarModule, TuiDataListWrapperModule, TuiSelectModule } from '@taiga-ui/kit';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CompanyService } from '@bookngo/base'
import { TuiTextfieldControllerModule } from '@taiga-ui/core';
import { HomePageComponent } from '../../../pages/home/home.component';
import { DepartmentService } from '../../../pages/home/services/department.service';

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
    styleUrls: ['./users-list.component.scss'],
    providers: [{
        provide: CompanyService,
        useFactory: (parentComponent: HomePageComponent) => parentComponent.companyService,
        deps: [forwardRef(() => HomePageComponent)]
    }]
})
export class UsersListComponent implements OnInit, OnDestroy {
    protected users$: User[];
    protected company$: Company | null
    protected activeDepartment$: string
    private destroy$: Subject<void> = new Subject<void>();

    filterForm: FormGroup

    constructor(private companyService: CompanyService, private _departmentService: DepartmentService) {
        this.filterForm = new FormGroup({
            department: new FormControl('')
        })
    }

    ngOnInit(): void {
        this._departmentService.getActiveUsers().pipe(
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
        this._departmentService.getActiveDepartment().pipe(
            tap((department) => {
                this.activeDepartment$ = department
            }),
            takeUntil(this.destroy$)
        )
        this.filterForm.controls['department'].valueChanges.pipe(
            tap(value => this._departmentService.setActiveDepartment(value))
        ).subscribe()
    }

    ngOnDestroy(): void {
        this.destroy$.next();
    }

    onDepartmentChange(): void {
        console.log('hehe')
    }
}
