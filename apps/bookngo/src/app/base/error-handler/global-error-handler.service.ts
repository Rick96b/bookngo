import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    constructor(private zone: NgZone, private _router: Router) {
    }

    handleError(error: any): void {
        this.zone.run((): void => {
            if (error instanceof HttpErrorResponse) {
                console.error('Backend returned status code: ', error.status);
                console.error('Response body:', error.message);
            } else {
                console.error('An error occurred:', error.message!);
            }

            if (error.statusText === 'Unauthorized') {
                this._router.navigate(['']);
            } else {
                this._router.navigate(['error']);
            }
        });
    }
}
