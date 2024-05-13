import { User, Vacation } from '@bookngo/base';
import { NotificationInterface } from '../interfaces/notification.interface';

export function notificationCreation(notification: User | Vacation): NotificationInterface {
    if ('employee' in notification) {
        return {
            createdAt: notification.createdAt,
            startDate: notification.startDate,
            endDate: notification.endDate,
            employee: notification.employee,
            vacationId: notification.id
        };
    }

    return {
        createdAt: notification.createdAt,
        userId: notification.id
    };
}
