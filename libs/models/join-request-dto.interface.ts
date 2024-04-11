import { StatusRequestEnum } from './enums/status-request.enum';

export interface JoinRequestDto {
  requestId: number;

  userId: number;
  companyId: number;
  status: StatusRequestEnum;
}
