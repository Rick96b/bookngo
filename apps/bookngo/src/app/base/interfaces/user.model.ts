import { UserDto } from "@common";

export class User {
    id: number 
    fullName: string
    email: string
    password: string

    companyName: string;
    employmentStatus: 'ceo' | 'employee'
    companyDepartment?: string;

    telegramUsername?: string;
    phoneNumber?: string;
  
    accumulatedVacationDays: number;
    compensationDays: number;
    vacationBalance: number;

    constructor(userDto: UserDto) {
        this.id = userDto.id
        this.fullName = userDto.fullName
        this.email = userDto.email
        this.password = userDto.password

        this.companyName = userDto.companyName
        this.companyDepartment = userDto.companyDepartment

        this.telegramUsername = userDto.telegramUsername
        this.phoneNumber = userDto.phoneNumber

        this.accumulatedVacationDays = userDto.accumulatedVacationDays
        this.compensationDays = userDto.compensationDays
        this.vacationBalance = userDto.vacationBalance
    }
}