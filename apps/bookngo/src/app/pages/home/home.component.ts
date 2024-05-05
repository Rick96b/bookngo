import { Component, forwardRef, OnInit } from '@angular/core';
import { CalendarComponent } from '../../modules/calendar';
import { UsersListComponent } from '../../modules/users-list';
import { CompanyService } from '@bookngo/base';
import { AppComponent } from '../../app.component';
import { DepartmentService } from './services/department.service';

@Component({
    standalone: true,
    imports: [
        CalendarComponent,
        UsersListComponent
    ],
    selector: 'app-home-page',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    providers: [{
        provide: CompanyService,
        useFactory: (parent: AppComponent) => parent.companyService,
        deps: [forwardRef(() => AppComponent)]
    }, DepartmentService]
})
export class HomePageComponent implements OnInit {
    constructor(public companyService: CompanyService) {
    }

    ngOnInit(): void {
    }
}
