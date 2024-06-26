import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsService } from '../../services/notifications.service';
import { User, UserService, Vacation } from '@bookngo/base';
import { NotificationsItemComponent } from '../notifications-item/notifications-item.component';
import { TuiButtonModule, TuiRootModule } from '@taiga-ui/core';
import { RouterLink } from '@angular/router';
import { CompensationDto } from '@common';
import { HighlightDirective } from '../../directives/highlight.directive';

@Component({
    selector: 'app-notifications',
    standalone: true,
    imports: [CommonModule, NotificationsItemComponent, TuiRootModule, RouterLink, TuiButtonModule, HighlightDirective],
    templateUrl: './notifications-page.component.html',
    styleUrl: './notifications-page.component.scss',
    providers: []
})
export class NotificationsPageComponent {
    constructor(protected notificationsService: NotificationsService, protected _userService: UserService) {
    }

    protected trackByFn(index: number, item: User | Vacation | CompensationDto) {
        return item.id;
    }
}
