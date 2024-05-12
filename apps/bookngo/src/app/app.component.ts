import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { TUI_SANITIZER, TuiRootModule } from '@taiga-ui/core';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService, DestroyService } from '@bookngo/base';
import { takeUntil, tap } from 'rxjs';

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

    constructor(private authService: AuthService, private router: Router, private destroy$: DestroyService) {

        this.authService.getAuthState()
            .pipe(
                tap((authState: boolean): void => {
                    const path: string = authState ? 'cabinet' : '';
                    this.router.navigate([path]);
                }),
                takeUntil(this.destroy$)
            ).subscribe();
    }
}
