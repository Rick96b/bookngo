import { Component, OnInit } from '@angular/core';
import { DestroyService } from '@bookngo/base';
import { takeUntil, tap } from 'rxjs';
import { TuiAvatarModule, TuiDataListWrapperModule, TuiSelectModule } from '@taiga-ui/kit';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TuiTextfieldControllerModule } from '@taiga-ui/core';
import { DepartmentService } from '../../../pages/home/services/department.service';
import { generateColorForUser } from '../../common/utils/generateColorForUser';
import { Router } from '@angular/router';

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
    providers: [DestroyService]
})
export class UsersListComponent implements OnInit {
    protected filterForm: FormGroup
	protected generateColorForUser = generateColorForUser
    constructor(protected _departmentService: DepartmentService, private destroy$: DestroyService, private _router: Router) {
        this.filterForm = new FormGroup({
            department: new FormControl(this._departmentService.getActiveDepartmentSnapshot())
        })
    }

    ngOnInit(): void {
        this.filterForm.controls['department'].valueChanges.pipe(
            tap((value: string) => this._departmentService.setActiveDepartment(value)),
            takeUntil(this.destroy$)
        ).subscribe()
    }

    protected navigateToProfile(userId: number): void {
        this._router.navigate(['cabinet', 'profile', userId])
    }
}
