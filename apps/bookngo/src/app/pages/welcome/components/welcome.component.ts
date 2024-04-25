import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TuiButtonModule } from '@taiga-ui/core';
import { AuthService } from '../../../base/services/auth.service';

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
    constructor(
        private authService: AuthService,
        private router: Router
    ) {

        if (this.authService.getAuthStateSnapshot()) {
            this.router.navigate(['/home']);
        }
    }
}
