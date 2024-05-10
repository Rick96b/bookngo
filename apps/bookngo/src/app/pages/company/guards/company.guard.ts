import { CanActivateFn } from "@angular/router";
import { Observable, mergeMap, of } from "rxjs";
import { CompanyService, UserService } from "../../../base/services";
import { inject } from "@angular/core";
import { User } from "../../../base/interfaces/user.model";

export const companyGuard: CanActivateFn = (): Observable<boolean> => {
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
