import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, UrlTree } from '@angular/router';

export const authGuard = (): boolean | UrlTree => {
    const authService: AuthService = inject(AuthService);

    if (authService.getAuthStateSnapshot()) {
        return true;
    }
    return inject(Router).parseUrl('');
};
