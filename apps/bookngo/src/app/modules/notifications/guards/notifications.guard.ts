import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '@bookngo/base';
import { NotificationsService } from '../services/notifications.service';
import { concatMap, of } from 'rxjs';

export const notificationsGuard: CanActivateFn = () => {

    const userService: UserService = inject(UserService);
    const notificationsService: NotificationsService = inject(NotificationsService)

    if(notificationsService.isLoaded){
        return true;
    }

    return notificationsService.fetchNotifications(userService.getMeSnapshot())
        .pipe(
            concatMap(() => {
                return of(true);
            })
        )

};
