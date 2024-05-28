import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { TUI_SANITIZER, TuiLoaderModule, TuiRootModule } from '@taiga-ui/core';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService, DestroyService } from '@bookngo/base';
import { switchMap, takeUntil, tap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    imports: [RouterModule, TuiRootModule, CommonModule, TuiLoaderModule],
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }, DestroyService]
})
export class AppComponent   {
    loading = true;
    title = 'bookngo';

    constructor(private authService: AuthService, private router: Router) {

        this.authService.updateAuthState()
            .pipe(switchMap(() => this.authService.getAuthState()
            .pipe(
                tap((authState: 'Approved' | 'Pending' | 'Undefined'): void => {
                    let path = ''
                    if(authState === 'Approved') {
                        path = 'cabinet/home'
                    } else if(authState === 'Pending') {
                        path = 'registration-pending'
                    }
                    this.router.navigate([path]).then(() => this.loading = false)
                })
            ))).subscribe()

    }


}
