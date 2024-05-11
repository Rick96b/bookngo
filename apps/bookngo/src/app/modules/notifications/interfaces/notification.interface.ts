export interface NotificationInterface {
    //status?: 'pending' | 'rejected' | 'approved';
    createdAt: Date;
    startDate?: string;
    endDate?: string;
    vacationId?: number;

    employee?: number;

    userId?: number;

}
