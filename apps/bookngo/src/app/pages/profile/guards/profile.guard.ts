import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../../../base/services/user.service';
import { concatMap, Observable, of } from 'rxjs';

export const profileGuard: CanActivateFn = (): Observable<boolean> => {
  return inject(UserService).fetchMe().pipe(
    concatMap(() => {
      return of(true);
    })
  );
};
