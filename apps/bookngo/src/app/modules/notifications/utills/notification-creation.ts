import { User, Vacation } from '@bookngo/base';
import { NotificationInterface } from '../interfaces/notification.interface';
import { CompensationDto } from '@common';

export function notificationCreation(notification: User | Vacation | CompensationDto): NotificationInterface {
    if ('startDate' in notification) {
        return {
            createdAt: notification.createdAt,
            startDate: notification.startDate,
            endDate: notification.endDate,
            employee: notification.employee,
            vacationId: notification.id
        };
    } else if ('date' in notification) {
        return {
            createdAt: notification.createdAt!,
            startDate: notification.date,
            employee: notification.employee,
            vacationId: notification.id
        }
    }

    return {
        createdAt: notification.createdAt,
        userId: notification.id
    };
}
