export interface VacationOutDto extends VacationInDto {
    id: number;
}

export interface VacationInDto {
    status?: 'pending' | 'rejected' | 'approved';
    employee: number;
    startDate: string;
    endDate: string;
}
