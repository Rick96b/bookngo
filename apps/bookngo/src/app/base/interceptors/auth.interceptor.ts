import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@bookngo/base';
import { Observable, retry, timer } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
    const authToken: string = inject(AuthService).getAuthToken();

    if (authToken) {
        const newReq: HttpRequest<unknown> = req.clone({ setHeaders: { Authorization: `Bearer ${authToken}` } });
        return next(newReq).pipe(
            retry({
                count: 2,
                delay: (_, retryCount: number) => timer(retryCount * 1000)
            })
        );
    }

    return next(req);
};
