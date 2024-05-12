export interface Vacation {
    id: number

    status: 'pending' | 'rejected' | 'approved'
    reviewStatus: boolean
    createdAt: Date
    employee: number
    startDate: string
    endDate: string
}
