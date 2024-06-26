export interface VacationInDto {
    status?: 'pending' | 'rejected' | 'approved';
    createdAt?: Date
    employee: number;
    startDate: string;
    endDate: string;
}
