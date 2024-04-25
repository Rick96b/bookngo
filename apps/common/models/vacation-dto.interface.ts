export interface VacationOutDto extends VacationInDto{
  id: number;
}

export interface VacationInDto {
  startDate: Date;
  endDate: Date;
  duration: number;
}
