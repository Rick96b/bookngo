export interface UserBaseInfoDto {
    fullName: string,
    email: string,
    password: string,

    createdAt: Date,
    updatedAt: Date,
    status: 'pending' | 'rejected' | 'approved'
    reviewStatus: boolean
    companyName: string;
    employmentStatus: 'ceo' | 'employee'
    companyDepartment?: string;
}
