import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { User, Vacation } from '@prisma/client';
import { UserDto } from '@common';
import { VacationBaseService } from '../base';


@Injectable()
export class UsersService {

    constructor(private _prismaService: PrismaService, private _vacationBaseService: VacationBaseService) {
    }

    async findOne(req: any): Promise<User> {
        //протипзировать
        // const user: User | null = await this._prismaService.user.findUnique({
        //     where: {
        //         email: req.user.email
        //     }
        // });


        return await this.getActualUser(req.user)

    }

    async findAll() {
        const users: User[] | null = await this._prismaService.user.findMany();
        users.forEach((item: User) => delete item.password);
        return users;
    }

    async updateOne(dto: UserDto) {
        return this._prismaService.user.update({
            where: {
                email: dto.email
            },
            data: {
                ...dto
            }
        });
    }

    async findUsersById(usersId: number[]): Promise<User[]> {
        const users: User[] = [];

        if (!usersId) {
            throw new BadRequestException({ message: 'Не переданы id пользователей' });
        }

        await Promise.all(usersId.map(async (id: number): Promise<void> => {
            try {
                const user: User = await this._prismaService.user.findFirstOrThrow({
                    where: {
                        id: id
                    }
                });

                if (user) {
                    delete user.password;
                    users.push(user);
                }
            } catch (err) {
                console.error(`Ошибка при поиске пользователя с id ${id}: ${err.message}`);
            }

        }));

        return users;

    }

    async getActualUser(dto: UserDto) {
        const oldUser: User = await this._prismaService.user.findUnique({
            where: {
                email: dto.email
            }
        });

        return this._prismaService.user.update({
            where: {
                email: dto.email
            },
            data: {
                ...await this.calculateVacationInfo(oldUser)
            }
        });

    }

    async  calculateVacationInfo(userDto: User, endDate: Date = new Date()): Promise<{accumulatedVacationDays: number, vacationBalance: number}> {
        const vacationHistory: Vacation[] = await this._vacationBaseService.getVacationsById(userDto.id);

        const startDate: Date = vacationHistory.length ? vacationHistory[vacationHistory.length - 1].endDate : new Date(userDto.createdAt);
        const dailySalary: number = userDto.salary / 30;
        let workDaysCount: number = Math.floor((endDate.getTime() - startDate.getTime()) / (24 * 3600 * 1000));




        if (workDaysCount < 0) {
            return {
                accumulatedVacationDays: 0,
                vacationBalance : 0
            }
        }

        const accumulatedVacationDays: number = (workDaysCount / 365 * 28)

        const vacationBalance: number = accumulatedVacationDays * dailySalary;

        return {accumulatedVacationDays, vacationBalance}
    }
}
