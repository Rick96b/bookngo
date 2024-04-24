import { Component, OnInit } from '@angular/core';
import { CalendarComponent } from '../../modules/calendar';
import { UsersListComponent } from '../../modules/users-list';

@Component({
    standalone: true,
    imports: [
        CalendarComponent,
        UsersListComponent
    ],
    selector: 'app-home-page',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomePageComponent implements OnInit {
    constructor() { }

    ngOnInit(): void { }
}
