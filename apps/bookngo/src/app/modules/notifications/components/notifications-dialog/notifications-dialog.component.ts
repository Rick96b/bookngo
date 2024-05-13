import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { TuiButtonModule, TuiDialogContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { CommonModule } from '@angular/common';
import { TuiAvatarModule, tuiAvatarOptionsProvider } from '@taiga-ui/kit';
import { DestroyService, User, UserService } from '@bookngo/base';
import { NotificationsService } from '../../services/notifications.service';
import { takeUntil, tap } from 'rxjs';
import { NotificationInterface } from '../../interfaces/notification.interface';
import { IContextDialog } from '../../interfaces/context-dialog.interface';
import { FormatStatusPipe } from '../../pipes/format-status.pipe';

@Component({
    selector: 'dialog-example',
    templateUrl: './notifications-dialog.component.html',
    styleUrls: ['./notifications-dialog.component.html'],
    imports: [TuiButtonModule, CommonModule, TuiAvatarModule, FormatStatusPipe],
    standalone: true,
    providers: [
        tuiAvatarOptionsProvider({
            size: 'xl',
            autoColor: true,
            rounded: true
        }),
        DestroyService
    ]
})
export class NotificationsDialogComponent {

    protected user: User;
    protected notification: NotificationInterface;
    protected notificationType: string;

    constructor(@Inject(POLYMORPHEUS_CONTEXT) protected readonly context: TuiDialogContext<void, IContextDialog>,
                protected notificationsService: NotificationsService,
                private destroy$: DestroyService,
                protected _userService: UserService
    ) {
        this.user = this.context.data.user;
        this.notification = this.context.data.notification;
        this.notificationType = this.context.data.type;
    }


    protected approve(): void {
        this.updateStatus(this.notificationType, 'approved');
    }

    protected reject(): void {
        this.updateStatus(this.notificationType, 'rejected');
    }

    private updateStatus(type: string, status: string): void {
        if (type === 'join') {
            this.notificationsService.sendStatusUser({ id: this.notification.userId!, status })
                .pipe(
                    tap(() => this.context.completeWith()),
                    takeUntil(this.destroy$)
                ).subscribe();
        } else {
            this.notificationsService.sendStatusVacation({ id: this.notification.vacationId!, status })
                .pipe(
                    tap(() => this.context.completeWith()),
                    takeUntil(this.destroy$)
                ).subscribe();
        }
    }

    protected confirm(): void {
        if (this.notificationType === 'join') {
            this.notificationsService.updateReviewStatusJoin().pipe(
                tap(() => this.context.completeWith()),
                takeUntil(this.destroy$)
            ).subscribe();

        } else {
            this.notificationsService.updateReviewStatusVacation(this.notification.vacationId!).pipe(
                tap(() => this.context.completeWith()),
                takeUntil(this.destroy$)
            ).subscribe();
        }
    }
}
