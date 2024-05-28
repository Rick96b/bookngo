import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { concatMap, Observable, of } from 'rxjs';
import { UserService } from '@bookngo/base';

export const profileGuard: CanActivateFn = (): Observable<boolean> => {
    const userService: UserService = inject(UserService);

    if (userService.isFetched) {
        return of(true);
    }
    return userService.fetchMe().pipe(
        concatMap(() => {
            return of(true);
        })
    );
};
