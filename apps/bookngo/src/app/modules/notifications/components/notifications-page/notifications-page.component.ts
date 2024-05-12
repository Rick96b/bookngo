import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsService } from '../../services/notifications.service';
import { CompanyService, UserService } from '@bookngo/base';
import { NotificationsItemComponent } from '../notifications-item/notifications-item.component';
import { TuiRootModule } from '@taiga-ui/core';

@Component({
    selector: 'app-notifications',
    standalone: true,
    imports: [CommonModule, NotificationsItemComponent, TuiRootModule],
    templateUrl: './notifications-page.component.html',
    styleUrl: './notifications-page.component.scss',
    providers: []
})
export class NotificationsPageComponent {
    constructor(protected notificationsService: NotificationsService, protected _companyService: CompanyService, protected _userService: UserService) {

    }

}
