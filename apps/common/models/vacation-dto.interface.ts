export interface VacationOutDto extends VacationInDto{
  id: number
}

export interface VacationInDto {
  employee: number
  startDate: string
  endDate: string
}
