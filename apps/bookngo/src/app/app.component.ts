import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { TUI_SANITIZER, TuiRootModule } from '@taiga-ui/core';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DestroyService } from '@bookngo/base';

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
}
