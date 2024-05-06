import { ErrorHandler, Injectable, NgZone } from '@angular/core';

@Injectable()
export class CustomErrorHandler implements ErrorHandler {

    constructor(private zone: NgZone) {
    }

    handleError(error: unknown): void {
        this.zone.run((): void => {
            console.error('Caught by Custom Error Handler: ', error);
        });
    }
}
