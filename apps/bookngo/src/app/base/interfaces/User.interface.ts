export interface User {
    id: number;

    fullName: string,
    email: string,
    password: string,
    telegramUsername?: string;
    phoneNumber?: string;
    
    companyName: string;
    employmentStatus: 'ceo' | 'employee'
    companyDepartment?: string;

    vacationsId: number[];
    accumulatedVacationDays: number;
    compensationDays: number;
    vacationBalance: number;
    color?: string;
}