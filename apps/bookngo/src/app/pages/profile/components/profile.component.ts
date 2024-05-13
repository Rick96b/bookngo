import { Component, computed, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiAvatarModule, tuiAvatarOptionsProvider } from '@taiga-ui/kit';
import { TabBarComponent } from '../../../modules/tab-bar';
import { ActivatedRoute, Params, RouterLink } from '@angular/router';
import { PositionTransformPipe } from '../pipes/position-transform.pipe';
import { TuiForModule } from '@taiga-ui/cdk';
import { CompanyService, DestroyService, User, UserService } from '@bookngo/base';
import { TuiButtonModule, TuiFormatPhonePipeModule } from '@taiga-ui/core';
import { VacationListComponent } from '../../../modules/vacation-list/components/vacation-list.component';
import { takeUntil, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [CommonModule, TabBarComponent, TuiAvatarModule, PositionTransformPipe, TuiForModule, RouterLink, TuiButtonModule, TuiFormatPhonePipeModule, VacationListComponent],
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
    protected userId: number;
    protected user: Signal<User | undefined>;
    protected isActive: boolean = true;

    constructor(
        protected _userService: UserService,
        private _activatedRoute: ActivatedRoute,
        private destroy$: DestroyService,
        private _companyService: CompanyService
    ) {
        this._activatedRoute.params.pipe(
            tap((params: Params): void => {
                this.userId = params['id'];
                this.updateUser();
            }),
            takeUntil(this.destroy$)
        ).subscribe();
    }

    private updateUser(): void {

        if (!this.userId) {
            this.user = toSignal(this._userService.getMe())
        } else {
            this.user = computed(() => this._companyService.getActiveUser(this.userId))
            this.isActive = false;
        }
    }
}
