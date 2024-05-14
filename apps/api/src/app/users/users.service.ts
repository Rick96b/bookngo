import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { User, Vacation } from '@prisma/client';
import { NotificationPutStatusDto, UserDto } from '@common';
import { CompanyBaseService, VacationBaseService } from '../base';


@Injectable()
export class UsersService {

    constructor(private _prismaService: PrismaService, private _vacationBaseService: VacationBaseService, private _companyBaseService: CompanyBaseService) {
    }

    async findOne(user: UserDto): Promise<User> {
        return await this.getActualUser(user);
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

    async findUsersById(usersId: number[], status: string = 'approved'): Promise<User[]> {
        const users: User[] = [];

        if (!usersId) {
            throw new BadRequestException({ message: 'Не переданы id пользователей' });
        }


        await Promise.all(usersId.map(async (id: number): Promise<void> => {
            try {
                const user: User = await this._prismaService.user.findFirstOrThrow({
                    where: {
                        id: id,
                        status: status
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

    async getActualUser(dto: UserDto): Promise<User> {
        const oldUser: User = await this._prismaService.user.findUnique({ where: { email: dto.email } });

        return this._prismaService.user.update({
            where: { email: dto.email },
            data: { ...await this.calculateVacationInfo(oldUser) }
        });
    }

    async calculateVacationInfo(userDto: User, endDate: Date = new Date()): Promise<{
        accumulatedVacationDays: number,
        vacationBalance: number
    }> {
        const vacationHistory: Vacation[] = await this._vacationBaseService.getVacationsById(userDto.id);

        const startDate: Date = vacationHistory.length ? vacationHistory[vacationHistory.length - 1].endDate : new Date(userDto.createdAt);
        const dailySalary: number = userDto.salary / 30;
        let workDaysCount: number = Math.floor((endDate.getTime() - startDate.getTime()) / (24 * 3600 * 1000));

        if (workDaysCount < 0) {
            return {
                accumulatedVacationDays: 0,
                vacationBalance: 0
            };
        }

        const accumulatedVacationDays: number = (workDaysCount / 365 * 28);
        const vacationBalance: number = accumulatedVacationDays * dailySalary;
        return { accumulatedVacationDays, vacationBalance };
    }

    async getPendingUsers(ceoId: number): Promise<User[]> {
        const employeesId: number[] = await this._companyBaseService.getEmployeesByCeoId(ceoId);
        return this.findUsersById(employeesId, 'pending');
    }

    async updateStatus(dto: NotificationPutStatusDto): Promise<User> {
        if (dto.status == 'rejected') {
            return this._prismaService.user.delete({
                where: {
                    id: dto.id
                }
            });
        }

        return this._prismaService.user.update({
            where: {
                id: dto.id
            },
            data: {
                status: dto.status,
                reviewStatus: true
            }
        });
    }

    async updateReviewStatus(id: number): Promise<User> {
        return this._prismaService.user.update({
            where: { id: id },
            data: { reviewStatus: false }
        });
    }
}
