import { UserBaseInfoDto } from './user-base-info.interface';

export interface UserDto extends UserBaseInfoDto {
    id: number;

    telegramUsername?: string;
    phoneNumber?: string;

    salary: number;
    accumulatedVacationDays: number;
    compensationDays: number;
    vacationBalance: number;
}
