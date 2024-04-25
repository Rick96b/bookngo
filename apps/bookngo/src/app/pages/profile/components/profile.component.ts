import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiAvatarModule, tuiAvatarOptionsProvider } from '@taiga-ui/kit';
import { TabBarComponent } from '../../../modules/tab-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { BnButtonComponent } from '@bookngo/ui-components';
import { PositionTransformPipe } from '../pipes/position-transform.pipe';
import { TuiForModule } from '@taiga-ui/cdk';
import { User } from '@bookngo/base';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [CommonModule, TabBarComponent, TuiAvatarModule, BnButtonComponent, PositionTransformPipe, TuiForModule],
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

        console.log(this._user)
        console.log(this.hasError)
    }

    protected reloadPage(): void {
        window.location.reload();
    }

    protected navigateToHome(): void {
        this._router.navigate(['home']);
    }
}
