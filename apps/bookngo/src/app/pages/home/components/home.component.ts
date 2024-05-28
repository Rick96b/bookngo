import { Component, OnInit } from '@angular/core';
import { CalendarComponent } from '../../../modules/calendar';
import { UsersListComponent } from '../../../modules/users-list';
import { DepartmentService } from '../services/department.service';
import { DestroyService } from '@bookngo/base';

@Component({
    standalone: true,
    imports: [
        CalendarComponent,
        UsersListComponent
    ],
    selector: 'app-home-page',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    providers: [DepartmentService, DestroyService]
})
export class HomePageComponent implements OnInit {
    constructor() {
    }

    ngOnInit(): void {
    }
}
