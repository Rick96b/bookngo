import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TuiButtonModule } from '@taiga-ui/core';

@Component({
    selector: 'app-error',
    standalone: true,
    imports: [CommonModule, TuiButtonModule],
    templateUrl: './error.component.html',
    styleUrl: './error.component.scss',
})
export class ErrorComponent {

    constructor(private _router: Router) {
    }

    protected navigateToHome(): void {
        this._router.navigate(['home']);
    }
}
