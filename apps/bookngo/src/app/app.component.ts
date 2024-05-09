import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { TUI_SANITIZER, TuiRootModule } from '@taiga-ui/core';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService, DestroyService } from '@bookngo/base';
import { tap } from 'rxjs';

@Component({
    standalone: true,
    imports: [RouterModule, TuiRootModule],
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer }, DestroyService]
})
export class AppComponent {

    title = 'bookngo';

    constructor(private authService: AuthService, private router: Router) {
        // подписка на глобальный сервис событий, без отписки, чтобы всегда срабатывал

        this.authService.getAuthState()
            .pipe(
                tap((state: boolean) : void => {
                    const path: string = state ? 'cabinet' : '';
                    this.router.navigate([path])
                })
            ).subscribe();
    }
}
