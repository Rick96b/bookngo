import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TuiButtonModule } from '@taiga-ui/core';

@Component({
    standalone: true,
    selector: 'app-welcome-page',
    imports: [
        TuiButtonModule,
        RouterLink
    ],
    templateUrl: './welcome.component.html',
    styleUrl: './welcome.component.scss'
})
export class WelcomePageComponent {
}
