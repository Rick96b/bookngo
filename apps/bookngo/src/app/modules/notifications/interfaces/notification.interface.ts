export interface NotificationInterface {
    //status?: 'pending' | 'rejected' | 'approved';
    createdAt: Date;
    startDate?: string;
    endDate?: string;
    missId?: number;

    employee?: number;

    userId?: number;

}
