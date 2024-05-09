import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiAvatarModule, tuiAvatarOptionsProvider } from '@taiga-ui/kit';
import { TabBarComponent } from '../../../modules/tab-bar';
import { RouterLink } from '@angular/router';
import { PositionTransformPipe } from '../pipes/position-transform.pipe';
import { TuiForModule } from '@taiga-ui/cdk';
import { DestroyService, UserService } from '@bookngo/base';
import { TuiButtonModule, TuiFormatPhonePipeModule } from '@taiga-ui/core';
import { FormatVacationDateDirective } from '../directives/format-vacation-date.directive';
import { FormatMonthDatePipe } from '../pipes/format-month-date.pipe';
import { FormatDayDatePipe } from '../pipes/format-day-date.pipe';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [CommonModule, TabBarComponent, TuiAvatarModule, PositionTransformPipe, TuiForModule, RouterLink, TuiButtonModule, TuiFormatPhonePipeModule, FormatVacationDateDirective, FormatMonthDatePipe, FormatDayDatePipe],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss',
    providers: [
        tuiAvatarOptionsProvider({
            size: 'xl',
            autoColor: true,
            rounded: true
        }),
        DestroyService
    ]
})
export class ProfileComponent {

    constructor(protected _userService: UserService) {
    }
}
