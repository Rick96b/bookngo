import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BnButtonComponent } from '@bookngo/ui-components';

@Component({
    selector: 'app-error',
    standalone: true,
    imports: [CommonModule, BnButtonComponent],
    templateUrl: './error.component.html',
    styleUrl: './error.component.scss',
})
export class ErrorComponent {

    constructor(private _router: Router) {
    }

    protected navigateToHome(): void {
        this._router.navigate(['cabinet']);
    }
}
