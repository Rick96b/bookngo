export interface UserBaseInfoDto {
    fullName: string,
    email: string,
    password: string,

    createdAt: Date,
    status: 'pending' | 'rejected' | 'approved'
    companyName: string;
    employmentStatus: 'ceo' | 'employee'
    companyDepartment?: string;
}
