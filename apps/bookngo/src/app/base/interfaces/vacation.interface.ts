export interface Vacation {
    id: number

    status: 'pending' | 'rejected' | 'approved'
    createdAt: Date
    employee: number
    startDate: string
    endDate: string
}
