import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiAvatarModule, tuiAvatarOptionsProvider } from '@taiga-ui/kit';
import { TabBarComponent } from '../../../modules/tab-bar';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { tap } from 'rxjs';
import { BnButtonComponent } from '@bookngo/ui-components';
import { PositionTransformPipe } from '../pipes/position-transform.pipe';
import { TuiForModule } from '@taiga-ui/cdk';
import { User } from '@bookngo/base';
import { TuiButtonModule } from '@taiga-ui/core';

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
export class ProfileComponent implements OnInit {
    protected _user: User;
    protected hasError = false;

    constructor(private _activatedRoute: ActivatedRoute, private _router: Router) {
    }

    ngOnInit(): void {
        this._activatedRoute.data.pipe(
            tap(({ user }): void => {
                user ? this._user = user : this.hasError = true;
            })
        ).subscribe();
    }

    protected reloadPage(): void {
        window.location.reload();
    }

    protected navigateToHome(): void {
        this._router.navigate(['home']);
    }
}
