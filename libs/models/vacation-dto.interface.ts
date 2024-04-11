import { StatusRequestEnum } from './enums/status-request.enum';

export interface VacationDto {
  id: number;
  startDate: Date;
  endDate: Date;
  duration: number;
}
