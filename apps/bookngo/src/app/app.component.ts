import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { TuiRootModule, TuiDialogModule, TuiAlertModule, TUI_SANITIZER } from "@taiga-ui/core";
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from "./modules/common/services/auth.service";
import { TabBarComponent } from "./modules/tab-bar";

@Component({
  standalone: true,
  imports: [RouterModule, TuiRootModule, TuiDialogModule, TuiAlertModule, TabBarComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
    providers: [{provide: TUI_SANITIZER, useClass: NgDompurifySanitizer}]
})
export class AppComponent {
  constructor(
    private authService: AuthService
  ){}
  title = 'bookngo';
  isLoggedIn = this.authService.isLoggedIn
}
