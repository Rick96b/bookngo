export interface INotification {
    status: 'pending' | 'rejected' | 'approved';
    createdAt: Date;
    startDate?: string;
    endDate?: string;

    employee?: number;

    fullName?: string
    userId?: number;
    companyDepartment?: string;

}
