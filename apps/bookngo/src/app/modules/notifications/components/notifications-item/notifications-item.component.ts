import { Component, Inject, Injector, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyService, DestroyService, User, Vacation } from '@bookngo/base';
import { FormatTimePipe } from '../../pipes/format-time.pipe';
import { TuiDialogModule, TuiDialogService, TuiRootModule } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { NotificationsDialogComponent } from '../notifications-dialog/notifications-dialog.component';
import { Observable, takeUntil } from 'rxjs';
import { UserDto } from '@common';

@Component({
    selector: 'app-notifications-item',
    standalone: true,
    imports: [CommonModule, FormatTimePipe, TuiDialogModule, TuiRootModule, NotificationsDialogComponent],
    templateUrl: './notifications-item.component.html',
    styleUrl: './notifications-item.component.scss',
    providers: [DestroyService]
})
export class NotificationsItemComponent {

    constructor(
        protected _companyService: CompanyService,
        @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
        @Inject(Injector) private readonly injector: Injector,
        private destroy$: DestroyService
    ) {
    }

    @Input('notification') public notificationVacation: Vacation;
    @Input({ required: true, alias: 'notificationType' }) public notificationType: string;

    private dialog: Observable<void>;


    public showDialog(user: UserDto): void {
        const context = {
            user: user,
            notification: this.notificationVacation ? this.notificationVacation : null
        }

        this.dialog = this.dialogs.open(
            new PolymorpheusComponent(NotificationsDialogComponent, this.injector),
            {
                data: context,
                label: this.notificationType,
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
