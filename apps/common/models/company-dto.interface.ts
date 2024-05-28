export interface CompanyOutDto extends CompanyInDto{
    id: number
}

export interface CompanyInDto {
    name: string
    ceo: number
    departments: string[]
    employees: number[]
}