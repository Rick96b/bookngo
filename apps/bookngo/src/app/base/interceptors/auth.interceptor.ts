import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@bookngo/base';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    const authToken: string = inject(AuthService).getAuthToken();
    if (authToken) {
        const newReq: HttpRequest<unknown> = req.clone({ headers: req.headers.append('Authorization', `Bearer ${authToken}`) });
        return next(newReq);
    }
    return next(req);
};
