import { Component, Inject, Injector, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyService, DestroyService, User, UserService, Vacation } from '@bookngo/base';
import { FormatTimePipe } from '../../pipes/format-time.pipe';
import { TuiDialogModule, TuiDialogService, TuiRootModule } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { NotificationsDialogComponent } from '../notifications-dialog/notifications-dialog.component';
import { Observable, takeUntil } from 'rxjs';
import { UserDto } from '@common';
import { NotificationInterface } from '../../interfaces/notification.interface';
import { NotificationsService } from '../../services/notifications.service';
import { HighlightDirective } from '../../directives/highlight.directive';

function notificationCreation(notification: User | Vacation): NotificationInterface {
    if ('employee' in notification) {
        return {
            createdAt: notification.createdAt,
            startDate: notification.startDate,
            endDate: notification.endDate,
            employee: notification.employee,
            vacationId: notification.id
        };
    }

    return {
        createdAt: notification.createdAt,
        userId: notification.id
    };
};

@Component({
    selector: 'app-notifications-item',
    standalone: true,
    imports: [CommonModule, FormatTimePipe, TuiDialogModule, TuiRootModule, NotificationsDialogComponent, HighlightDirective],
    templateUrl: './notifications-item.component.html',
    styleUrl: './notifications-item.component.scss',
    providers: [DestroyService]
})
export class NotificationsItemComponent {

    @Input({ required: true, alias: 'type' }) public notificationType: string;
    @Input({ alias: 'notification', transform: notificationCreation }) public notification: NotificationInterface;
    @Input({ required: true, alias: 'notificationLabel' }) public notificationLabel: string;

    constructor(
        @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
        @Inject(Injector) private readonly injector: Injector,
        protected _companyService: CompanyService,
        protected _notificationsService: NotificationsService,
        private destroy$: DestroyService,
        protected _userService: UserService
    ) {
    }

    private dialog: Observable<null>;

    public showDialog(user: UserDto): void {

        const context = {
            user: user,
            notification: this.notification,
            type: this.notificationType
        };

        this.dialog = this.dialogs.open(
            new PolymorpheusComponent(NotificationsDialogComponent, this.injector),
            {
                data: context,
                label: this.notificationLabel,
                dismissible: true,
                size: 'auto'
            }
        );

        this.dialog
            .pipe(
                takeUntil(this.destroy$)
            ).subscribe();
    }
}
