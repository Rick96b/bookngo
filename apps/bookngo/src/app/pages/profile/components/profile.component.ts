import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiAvatarModule, tuiAvatarOptionsProvider } from '@taiga-ui/kit';
import { TabBarComponent } from '../../../modules/tab-bar';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subject, takeUntil, tap } from 'rxjs';
import { BnButtonComponent } from '@bookngo/ui-components';
import { PositionTransformPipe } from '../pipes/position-transform.pipe';
import { TuiForModule } from '@taiga-ui/cdk';
import { User } from '@bookngo/base';
import { TuiButtonModule } from '@taiga-ui/core';
import { UserService } from '../../../base/services/user.service';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [CommonModule, TabBarComponent, TuiAvatarModule, BnButtonComponent, PositionTransformPipe, TuiForModule, RouterLink, TuiButtonModule],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss',
    providers: [
        tuiAvatarOptionsProvider({
            size: 'xl',
            autoColor: true,
            rounded: true,
        })
    ]
})
export class ProfileComponent implements OnInit, OnDestroy {
    protected user: User;
    protected hasError = false;
    private destroy$: Subject<null> = new Subject<null>;

    constructor(private _activatedRoute: ActivatedRoute, private _router: Router, private _userService: UserService) {
    }

    ngOnDestroy(): void {
        this.destroy$.next(null)
    }

    ngOnInit(): void {
        console.log()

        this._userService.getMe().pipe(
            tap((user: User | null): void => {
                user ? this.user = user : this.hasError = true;
            }),
            takeUntil(this.destroy$)
        ).subscribe();

    }

    protected reloadPage(): void {
        window.location.reload();
    }

    protected navigateToHome(): void {
        this._router.navigate(['home']);
    }
}
