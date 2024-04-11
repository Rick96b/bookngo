import { StatusVacationEnum } from './enums/status-vacation.enum';
import { VacationDto } from './vacation-dto.interface';

export interface UserDto {
  id: number;

  name: string;
  surname: string;
  email: string;
  telegramUsername: string;
  phoneNumber: string;
  companyId: number;
  employmentStatus: StatusVacationEnum;
  vacations: VacationDto[];

  accumulatedVacationDays: number;
  compensationDays: number;
  vacationBalance: number;

  password: string;
}
