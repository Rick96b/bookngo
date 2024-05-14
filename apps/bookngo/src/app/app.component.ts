import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { TUI_SANITIZER, TuiRootModule } from '@taiga-ui/core';
import { Component, Inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService, BASE_URL_TOKEN, DestroyService } from '@bookngo/base';
import { HttpClient } from '@angular/common/http';
import { takeUntil, tap } from 'rxjs';
import { log } from '@angular-devkit/build-angular/src/builders/ssr-dev-server';

@Component({
    standalone: true,
    imports: [RouterModule, TuiRootModule],
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }, DestroyService]
})
export class AppComponent   {

    title = 'bookngo';

    constructor(private authService: AuthService, private router: Router, private destroy: DestroyService) {

        this.authService.updateAuthState()
            .pipe(takeUntil(destroy))
            .subscribe();
        this.authService.getAuthState()
            .pipe(
                tap((authState: 'Approved' | 'Pending' | 'Undefined'): void => {
                    const path: string = authState === 'Approved' ? 'cabinet' : '';
                    this.router.navigate([path]);
                }),
            ).subscribe()
    }


}
