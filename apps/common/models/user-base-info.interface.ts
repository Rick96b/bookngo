export interface UserBaseInfoDto {
    fullName: string,
    email: string,
    password: string,

    status: 'pending' | 'rejected' | 'approved'
    companyName: string;
    employmentStatus: 'ceo' | 'employee'
    companyDepartment?: string;
}
