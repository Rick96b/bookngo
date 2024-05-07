import { Component, forwardRef, OnInit } from '@angular/core';
import { Company, CompanyService, DestroyService, User } from '@bookngo/base';
import { takeUntil, tap } from 'rxjs';
import { TuiAvatarModule, TuiDataListWrapperModule, TuiSelectModule } from '@taiga-ui/kit';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TuiTextfieldControllerModule } from '@taiga-ui/core';
import { HomePageComponent } from '../../../pages/home/components/home.component';
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
        deps: [forwardRef(() => HomePageComponent)],
    }, DestroyService]
})
export class UsersListComponent implements OnInit {
    protected users$: User[];
    protected company$: Company | null
    protected activeDepartment$: string

    filterForm: FormGroup

    constructor(private companyService: CompanyService, private _departmentService: DepartmentService, private destroy$: DestroyService ) {
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

    onDepartmentChange(): void {
        console.log('hehe')
    }
}
