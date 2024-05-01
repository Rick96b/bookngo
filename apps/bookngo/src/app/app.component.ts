import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { TuiRootModule, TuiDialogModule, TuiAlertModule, TUI_SANITIZER } from '@taiga-ui/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from './base/services/auth.service';
import { TabBarComponent } from './modules/tab-bar';
import { CalendarComponent } from './modules/calendar/components/calendar/calendar.component';
import { Subject, takeUntil, tap } from 'rxjs';
import { CompanyService } from '@bookngo/base';
import { HomePageComponent } from './pages/home/home.component';

@Component({
    standalone: true,
    imports: [RouterModule, TuiRootModule, TuiDialogModule, TuiAlertModule, TabBarComponent, CalendarComponent, HomePageComponent],
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    providers: [{ provide: TUI_SANITIZER, useClass: NgDompurifySanitizer} ]
})
export class AppComponent implements OnInit, OnDestroy {
    constructor(private authService: AuthService, public companyService: CompanyService) {
    }

    title = 'bookngo';
    private destroy$: Subject<void> = new Subject<void>();
    protected isLoggedIn: boolean;

    ngOnInit(): void {
        this.authService.getAuthState().pipe(
            tap((state: boolean) => this.isLoggedIn = state),
            takeUntil(this.destroy$)
        ).subscribe();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
    }
}
