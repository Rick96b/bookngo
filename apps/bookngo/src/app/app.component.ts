import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { TUI_SANITIZER, TuiAlertModule, TuiDialogModule, TuiRootModule } from '@taiga-ui/core';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from './base/services/auth.service';
import { TabBarComponent } from './modules/tab-bar';
import { CalendarComponent } from './modules/calendar/components/calendar/calendar.component';
import { takeUntil, tap } from 'rxjs';
import { DestroyService } from '@bookngo/base';
import { HomePageComponent } from './pages/home/components/home.component';

@Component({
    standalone: true,
    imports: [RouterModule, TuiRootModule, TuiDialogModule, TuiAlertModule, TabBarComponent, CalendarComponent, HomePageComponent],
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer}, DestroyService ]
})
export class AppComponent implements OnInit {
    constructor(private authService: AuthService, private destroy$: DestroyService) {
    }

    title = 'bookngo';
    protected isLoggedIn: boolean;

    ngOnInit(): void {
        this.authService.getAuthState().pipe(
            tap((state: boolean) => this.isLoggedIn = state),
            takeUntil(this.destroy$)
        ).subscribe();
    }
}
