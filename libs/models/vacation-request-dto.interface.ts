import { StatusRequestEnum } from './enums/status-request.enum';

export interface VacationRequestDto {
  requestId: number;
  userId: number;
  startDate: Date;
  endDate: Date;
  status: StatusRequestEnum;
  message: string;
}
