import { Component, Inject, Injector, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyService, DestroyService, User, Vacation } from '@bookngo/base';
import { FormatTimePipe } from '../../pipes/format-time.pipe';
import { TuiDialogModule, TuiDialogService, TuiRootModule } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { NotificationsDialogComponent } from '../notifications-dialog/notifications-dialog.component';
import { Observable, takeUntil } from 'rxjs';
import { UserDto } from '@common';
import { log } from '@angular-devkit/build-angular/src/builders/ssr-dev-server';
import { INotification } from '../../interfaces/INotification';
import { NotificationsService } from '../../services/notifications.service';


function notificationCreation(notification: User | Vacation): INotification {
    if ('employee' in notification) {
        return {
            status: notification.status,
            createdAt: notification.createdAt,
            startDate: notification.startDate,
            endDate: notification.endDate,
            employee: notification.employee,
            vacationId: notification.id
        }
    }

    return {
        status: 'pending',
        createdAt: notification.createdAt,
        fullName: notification.fullName,
        companyDepartment: notification.companyDepartment,
        userId: notification.id
    }
}
@Component({
    selector: 'app-notifications-item',
    standalone: true,
    imports: [CommonModule, FormatTimePipe, TuiDialogModule, TuiRootModule, NotificationsDialogComponent],
    templateUrl: './notifications-item.component.html',
    styleUrl: './notifications-item.component.scss',
    providers: [DestroyService]
})
export class NotificationsItemComponent implements OnInit{

    constructor(
        protected _companyService: CompanyService,
        protected _notificationsService : NotificationsService,
        @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
        @Inject(Injector) private readonly injector: Injector,
        private destroy$: DestroyService
    ) {
    }

    ngOnInit(): void {
        console.log(this.notification);
    }



    @Input({required: true, alias: 'type'}) public notificationType: string
    @Input({ alias: 'notification', transform: notificationCreation}) public notification: INotification;
    @Input({ required: true, alias: 'notificationLabel' }) public notificationLabel: string;

    private dialog: Observable<void>;


    public showDialog(user: UserDto): void {


        const context = {
            user: user,
            notification: this.notification,
            type: this.notificationType
        }

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
            )
            .subscribe({
                complete: () => {
                    console.info('Dialog closed');
                }
            });
    }
}
