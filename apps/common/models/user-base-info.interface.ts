export interface UserBaseInfoDto {
    name: string,
    email: string,
    password: string,

    companyName: string;
    employmentStatus: 'ceo' | 'employee'
    departmentName?: string;
}   