import { Component, OnDestroy, OnInit } from '@angular/core';
import { User, Company } from '@bookngo/base';
import { Subject, takeUntil, tap } from 'rxjs';
import { TuiAvatarModule, TuiSelectModule } from '@taiga-ui/kit';
import { CommonModule } from '@angular/common';
import { FormControl } from '@angular/forms';
import { CompanyService } from '@bookngo/base'

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
    company: Company
    private destroy$: Subject<void> = new Subject<void>();
    selectControl = new FormControl()

    constructor(private companyService: CompanyService) {
    }

    ngOnInit(): void {
        this.companyService.getAllUsers().pipe(
            tap((users: User[]): void => {
                this.users = users;
            }),
            takeUntil(this.destroy$)
        ).subscribe();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
    }
}
