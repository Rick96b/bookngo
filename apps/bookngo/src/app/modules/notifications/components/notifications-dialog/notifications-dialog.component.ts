import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { TuiButtonModule, TuiDataListModule, TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TuiAutoFocusModule } from '@taiga-ui/cdk';
import { TuiAvatarModule, tuiAvatarOptionsProvider, TuiDataListWrapperModule } from '@taiga-ui/kit';
import { DestroyService, User, Vacation } from '@bookngo/base';
import { NotificationsService } from '../../services/notifications.service';
import { takeUntil, tap } from 'rxjs';

@Component({
    selector: 'dialog-example',
    templateUrl: './notifications-dialog.component.html',
    styleUrls: ['./notifications-dialog.component.html'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        TuiButtonModule,
        CommonModule,
        FormsModule,
        TuiButtonModule,
        TuiDataListModule,
        TuiDataListWrapperModule,
        TuiAutoFocusModule,
        TuiAvatarModule
    ],
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
    protected notification: Vacation | User;

    constructor(@Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
                @Inject(POLYMORPHEUS_CONTEXT) protected readonly context: TuiDialogContext<any, any>,
                protected notificationsService: NotificationsService,
                private destroy$: DestroyService
    ) {
        this.user = this.context.data.user;
        this.notification = this.context.data.notification ? context.data.notification : null;
    }


    protected approve(): void {
        if ('employee' in this.notification) {
            this.notification.status = 'approved';
            this.notificationsService.sendStatusVacation(this.notification)
                .pipe(
                    tap(() => this.context.completeWith(null)),
                    takeUntil(this.destroy$)
                ).subscribe();
        } else {
            this.notification.status = 'approved';
            this.notificationsService.sendStatusUser(this.notification)
                .pipe(
                    tap(() => this.context.completeWith(null)),
                    takeUntil(this.destroy$)
                ).subscribe();
        }

    }

    protected reject(): void {
        if ('employee' in this.notification) {
            this.notification.status = 'rejected';
            this.notificationsService.sendStatusVacation(this.notification)
                .pipe(
                    tap(() => this.context.completeWith(null)),
                    takeUntil(this.destroy$)
                ).subscribe();
        } else {
            this.notification.status = 'approved';
            this.notificationsService.sendStatusUser(this.notification)
                .pipe(
                    tap(() => this.context.completeWith(null)),
                    takeUntil(this.destroy$)
                ).subscribe();
        }
    }

}
