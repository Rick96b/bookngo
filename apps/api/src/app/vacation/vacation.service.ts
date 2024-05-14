import { VacationInDto } from '@common';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { User, Vacation } from '@prisma/client';
import { CompanyBaseService, UserBaseService } from '../base';
import { NotificationPutStatusDto } from '@common';

@Injectable()
export class VacationService {
    constructor(private _prismaService: PrismaService, private _userBaseService: UserBaseService, private _companyBaseService: CompanyBaseService) {
    }

    async getVacations(userId: number, userRequestDto: User): Promise<Vacation[]> {
        const user: User = await this._userBaseService.getUser(userRequestDto.email);
        if (user.status === 'pending') {
            return [];
        }
        return this._prismaService.vacation.findMany({
            where: {
                employee: userId
            }
        });
    }

    async getPendingVacations(ceoId: number): Promise<Vacation[]> {

        const employeesId: number[] = await this._companyBaseService.getEmployeesByCeoId(ceoId);
        const vacations: Vacation[] = [];

        await Promise.all(employeesId.map(async (id: number): Promise<void> => {
            try {
                const vacation: Vacation[] = await this._prismaService.vacation.findMany({
                    where: {
                        employee: id,
                        status: 'pending'
                    }
                });

                if (vacations) {
                    vacations.push(...vacation);
                }
            } catch (err) {
                console.error(`Ошибка при поиске отпуска с id ${id}: ${err.message}`);
            }
        }));

        return vacations;
    }

    async postVacation(dto: VacationInDto): Promise<Vacation> {
        const oldVacation: Vacation = await this._prismaService.vacation.findFirst({
            where: { employee: dto.employee, startDate: dto.startDate, endDate: dto.endDate }
        });

        if (oldVacation) {
            throw new BadRequestException('Vacation already exist');
        }

        return this._prismaService.vacation.create({ data: dto });
    }

    async updateStatus(dto: NotificationPutStatusDto): Promise<Vacation> {
        return this._prismaService.vacation.update({
            where: { id: dto.id },
            data: { status: dto.status, reviewStatus: true }
        });
    }

    async updateReviewStatus(dto: NotificationPutStatusDto): Promise<Vacation> {
        const vacation: Vacation = await this._prismaService.vacation.findFirst({where: {id: dto.id}})
        if (vacation.status === 'rejected') {
            return this._prismaService.vacation.delete({ where: { id: dto.id } });
        } else {
            return this._prismaService.vacation.update({ where: { id: dto.id }, data: { reviewStatus: false } });
        }
    }
}
