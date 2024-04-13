export interface UserDto {
  id: number;

  name: string;
  surname: string;
  email: string;
  telegramUsername: string;
  phoneNumber: string;
  companyId: number;
  employmentStatus: 'ceo' | 'employee'
  vacationsId: number[];

  accumulatedVacationDays: number;
  compensationDays: number;
  vacationBalance: number;

  password: string;
}
