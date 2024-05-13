export interface CompensationDto {
    id?: number;
    createdAt?: Date

    reviewStatus?: boolean
    employee: number;
    date: string;
    status?: 'pending' | 'rejected' | 'approved';
}
