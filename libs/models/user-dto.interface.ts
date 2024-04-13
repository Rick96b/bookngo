import { StatusVacationEnum } from './enums/status-vacation.enum';

export interface UserDto {
  id: number;

  name: string;
  surname: string;
  email: string;
  telegramUsername: string;
  phoneNumber: string;
  companyId: number;
  employmentStatus: StatusVacationEnum;
  vacationsId: number[];

  accumulatedVacationDays: number;
  compensationDays: number;
  vacationBalance: number;

  password: string;
}
