import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../../common/services/department.service';
import { User } from '@bookngo/base'
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
    standalone: true,
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
    users: User[]
    private destroy$: Subject<void> = new Subject<void>();

    constructor(
        private departmentServise: DepartmentService
    ) { }

    ngOnInit(): void { 
        this.departmentServise.getUsers$().pipe(
            tap((users) => {
                this.users = users
            }),
            takeUntil(this.destroy$)
        ).subscribe()
    }

    ngOnDestroy(): void {
        this.destroy$.next();
    }
}