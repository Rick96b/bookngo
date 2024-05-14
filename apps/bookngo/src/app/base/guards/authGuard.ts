import { inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { AuthService } from '@bookngo/base';

export const authGuard = (): boolean | UrlTree => {
    const authService: AuthService = inject(AuthService);
    console.log(authService.rnd);

    const router = inject(Router)

    console.log(authService.getAuthStateSnapshot());
    if (authService.getAuthStateSnapshot() === 'Approved') {
        return true;
    } else if (authService.getAuthStateSnapshot() === 'Pending') {
        return router.createUrlTree(['/registration-penging']);
    }

    return router.createUrlTree(['']);
};
