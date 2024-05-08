import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiAvatarModule, tuiAvatarOptionsProvider } from '@taiga-ui/kit';
import { TabBarComponent } from '../../../modules/tab-bar';
import { Router, RouterLink } from '@angular/router';
import { takeUntil, tap } from 'rxjs';
import { BnButtonComponent } from '@bookngo/ui-components';
import { PositionTransformPipe } from '../pipes/position-transform.pipe';
import { TuiForModule } from '@taiga-ui/cdk';
import { DestroyService, User, UserService } from '@bookngo/base';
import { TuiButtonModule, TuiFormatPhonePipeModule } from '@taiga-ui/core';

@Component({
  selector: 'app-profile',
  standalone: true,
    imports: [CommonModule, TabBarComponent, TuiAvatarModule, BnButtonComponent, PositionTransformPipe, TuiForModule, RouterLink, TuiButtonModule, TuiFormatPhonePipeModule],
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
export class ProfileComponent implements OnInit {
  protected _user: User;
  protected hasError = false;

  constructor(private _router: Router, private _userService: UserService, private destroy$: DestroyService) {
  }

  ngOnInit(): void {
    this._userService.getMe()
      .pipe(
        tap((user: User | null): void => {
          user ? this._user = user : this.hasError = true;
        }),
        takeUntil(this.destroy$)
      ).subscribe();
  }

  protected reloadPage(): void {
    window.location.reload();
  }

  protected navigateToHome(): void {
    this._router.navigate(['cabinet']);
  }
}
