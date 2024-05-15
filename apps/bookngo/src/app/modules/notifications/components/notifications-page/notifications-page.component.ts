import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsService } from '../../services/notifications.service';
import { UserService } from '@bookngo/base';
import { NotificationsItemComponent } from '../notifications-item/notifications-item.component';
import { TuiButtonModule, TuiRootModule } from '@taiga-ui/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-notifications',
    standalone: true,
  imports: [CommonModule, NotificationsItemComponent, TuiRootModule, RouterLink, TuiButtonModule],
    templateUrl: './notifications-page.component.html',
    styleUrl: './notifications-page.component.scss',
    providers: []
})
export class NotificationsPageComponent {
    constructor(protected notificationsService: NotificationsService, protected _userService: UserService) {
    }

}
