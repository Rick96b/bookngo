import {  CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../../../base/services/user.service';
import { of, switchMap } from 'rxjs';

export const profileGuard: CanActivateFn = () => {
    return inject(UserService).fetchMe().pipe(
        switchMap(() => {
            return of(true);
        })
    );
};
