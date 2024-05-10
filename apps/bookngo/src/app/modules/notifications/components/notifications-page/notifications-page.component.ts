import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsService } from '../../services/notifications.service';
import { CompanyService } from '@bookngo/base';
import { NotificationsItemComponent } from '../notifications-item/notifications-item.component';

@Component({
    selector: 'app-notifications',
    standalone: true,
    imports: [CommonModule, NotificationsItemComponent],
    templateUrl: './notifications-page.component.html',
    styleUrl: './notifications-page.component.scss',
    providers: []
})
export class NotificationsPageComponent {
    constructor(protected notificationsService: NotificationsService, protected _companyService: CompanyService) {
        //console.log(notificationsService.getVacationsRequestNotifications());
    }

}
