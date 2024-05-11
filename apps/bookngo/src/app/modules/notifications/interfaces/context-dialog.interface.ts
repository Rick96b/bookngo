import { User } from '@bookngo/base';
import { NotificationInterface } from './notification.interface';

export interface IContextDialog {
    user: User;
    notification: NotificationInterface,
    type: string
}
