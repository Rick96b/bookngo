import { Component, computed, effect, Signal } from '@angular/core';
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
import { ThemeService } from '../../../services/theme.service';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [CommonModule, TabBarComponent, TuiAvatarModule, PositionTransformPipe, TuiForModule, RouterLink, TuiButtonModule, TuiFormatPhonePipeModule, VacationListComponent],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss',
    providers: [
        DestroyService
    ]
})
export class ProfileComponent {
    protected userId: number;
    protected user: Signal<User>;
    protected isActive: boolean = true;

    constructor(
        protected _userService: UserService,
        private _activatedRoute: ActivatedRoute,
        private destroy$: DestroyService,
        private _companyService: CompanyService,
        protected themeService: ThemeService
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
            this.user = toSignal(this._userService.getMe(), {requireSync: true})
        } else {
            this.user = computed(() => this._companyService.getActiveUser(this.userId)!)
            this.isActive = false;
        }
    }

    toggleTheme() {
        this.themeService.toggleTheme();
    }
}
