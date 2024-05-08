import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { mergeMap, Observable, of } from 'rxjs';
import { CompanyService, User, UserService } from '@bookngo/base';

export const homeGuard: CanActivateFn = (): Observable<boolean> => {
    const companyService: CompanyService = inject(CompanyService);
    const userService: UserService = inject(UserService);

    if (companyService.isFetched) {
        return of(true);
    }
    if (userService.isFetched) {
        companyService.fetchCompanyData(userService.getMeSnapshot().companyName);
    }

    return userService.fetchMe()
        .pipe(
            mergeMap((user: User | null) => companyService.fetchCompanyData(user!.companyName)),
            mergeMap(() => of(true)),
        );
};
