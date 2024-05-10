import { ChangeDetectionStrategy, Component, Inject, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyService, User, Vacation } from '@bookngo/base';
import { FormatTimePipe } from '../../pipes/format-time.pipe';
import { TuiDialogModule, TuiDialogService, TuiRootModule } from '@taiga-ui/core';

@Component({
    selector: 'app-notifications-item',
    standalone: true,
    imports: [CommonModule, FormatTimePipe, TuiRootModule, TuiDialogModule,],
    templateUrl: './notifications-item.component.html',
    styleUrl: './notifications-item.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationsItemComponent {

    constructor(protected _companyService: CompanyService, @Inject(TuiDialogService) private readonly dialogs: TuiDialogService) {
    }
    @Input({required: true, alias: 'notification'}) public notificationVacation: Vacation


    showDialog(): void {
        this.dialogs
            .open(
                'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
                {
                    label: 'What is Lorem Ipsum?',
                    appearance: 'lorem-ipsum',
                },
            )
            .subscribe();
    }
}
