import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    constructor(private zone: NgZone, private _router: Router) {
    }

    handleError(error: unknown): void {
        this.zone.run((): void => {
            console.error('Caught by Custom Error Handler: ', error);
            this._router.navigate(['error']);
        });
    }
}
