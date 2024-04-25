import { Component, OnDestroy, OnInit } from '@angular/core';
import { DepartmentService } from '../../common/services/department.service';
import { User } from '@bookngo/base';
import { Subject, takeUntil, tap } from 'rxjs';
import { TuiAvatarModule, TuiSelectModule } from '@taiga-ui/kit';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    imports: [
        TuiAvatarModule,
        TuiSelectModule,
        CommonModule
    ],
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnDestroy {
    users: User[];
    private destroy$: Subject<void> = new Subject<void>();

    constructor(private departmentService: DepartmentService) {
    }

    ngOnInit(): void {
        this.departmentService.getUsers$().pipe(
            tap((users: User[]): void => {
                this.users = users;
            }),
            takeUntil(this.destroy$)
        ).subscribe(console.log);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
    }
}
