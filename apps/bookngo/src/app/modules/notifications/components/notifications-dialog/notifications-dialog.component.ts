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
    protected vacation: Vacation | null;

    constructor(@Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
                @Inject(POLYMORPHEUS_CONTEXT) protected readonly context: TuiDialogContext<any, any>,
                protected notificationsService: NotificationsService,
                private destroy$: DestroyService
    ) {
        this.user = this.context.data.user;
        this.vacation = this.context.data.notification ? context.data.notification : null;
        console.log(context.header);
    }


    protected approve(): void {
        if (this.vacation) {
            this.vacation.status = 'approved';
            this.notificationsService.sendStatusVacation(this.vacation)
                .pipe(
                    tap(() => this.context.completeWith(null)),
                    takeUntil(this.destroy$)
                ).subscribe();
        }

    }

    protected reject(): void {
        if (this.vacation) {
            this.vacation.status = 'rejected';
            this.notificationsService.sendStatusVacation(this.vacation)
                .pipe(
                    tap(() => this.context.completeWith(null)),
                    takeUntil(this.destroy$)
                ).subscribe();
        }
    }

}
