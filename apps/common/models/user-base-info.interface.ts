export interface UserBaseInfoDto {
    fullName: string,
    email: string,
    password: string,

    companyName: string;
    employmentStatus: 'ceo' | 'employee'
    companyDepartment?: string;
}   