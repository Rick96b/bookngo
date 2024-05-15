import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '@bookngo/base';
import { NotificationsService } from '../services/notifications.service';
import { catchError, concatMap, Observable, of } from 'rxjs';

export const notificationsGuard: CanActivateFn = (): boolean | Observable<boolean> => {

    const userService: UserService = inject(UserService);
    const notificationsService: NotificationsService = inject(NotificationsService);
    return notificationsService.updateNotifications(userService.getMeSnapshot());
};
