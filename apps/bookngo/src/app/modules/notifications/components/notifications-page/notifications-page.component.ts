import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsService } from '../../services/notifications.service';
import { User, UserService, Vacation } from '@bookngo/base';
import { NotificationsItemComponent } from '../notifications-item/notifications-item.component';
import { TuiButtonModule, TuiRootModule } from '@taiga-ui/core';
import { RouterLink } from '@angular/router';
import { CompensationDto } from '@common';
import { HighlightDirective } from '../../directives/highlight.directive';
import { combineLatest, map, Observable } from 'rxjs';

@Component({
    selector: 'app-notifications',
    standalone: true,
    imports: [CommonModule, NotificationsItemComponent, TuiRootModule, RouterLink, TuiButtonModule, HighlightDirective],
    templateUrl: './notifications-page.component.html',
    styleUrl: './notifications-page.component.scss',
    providers: []
})
export class NotificationsPageComponent {
    protected hasNotifications$: Observable<boolean>;

    constructor(protected notificationsService: NotificationsService, protected _userService: UserService) {
        this.hasNotifications$ = combineLatest([
            this.notificationsService.getVacationsRequestNotifications(),
            this.notificationsService.getJoinRequestNotifications(),
            this.notificationsService.getCompensationsRequestNotifications()
        ]).pipe(
            map(([vacations, joins, compensations]) => 
                (vacations?.length || 0) + (joins?.length || 0) + (compensations?.length || 0) > 0
            )
        );
    }

    protected trackByFn(index: number, item: User | Vacation | CompensationDto) {
        return item.id;
    }
}
