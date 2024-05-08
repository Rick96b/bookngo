import { inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { AuthService } from '@bookngo/base';

export const authGuard = (): boolean | UrlTree => {
    const authService: AuthService = inject(AuthService);

    if (authService.getAuthStateSnapshot()) {
        return true;
    }

    return inject(Router).createUrlTree(['']);
};
