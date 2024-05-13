import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CompanyBaseService, UserBaseService } from '../base';
import { CompensationDto, NotificationPutStatusDto, UserDto } from '@common';
import { Compensation, User } from '@prisma/client';

@Injectable()
export class CompensationService {

    constructor(private _prismaService: PrismaService, private _userBaseService: UserBaseService, private _companyBaseService: CompanyBaseService) {
    }

    async postCompensation(dto: CompensationDto): Promise<Compensation> {
        const oldCompensation: Compensation = await this._prismaService.compensation
            .findFirst({ where: { employee: dto.employee, date: dto.date } });

        if (oldCompensation) {
            throw new BadRequestException('CompensationDto already exist');
        }

        return this._prismaService.compensation.create({ data: dto });
    }

    async getCompensation(id: number, userDto: UserDto) {
        const user: User = await this._userBaseService.getUser(userDto.email);
        if (user.status === 'rejected' || user.status === 'pending') {
            return [];
        }

        return this._prismaService.compensation.findMany({ where: { employee: id, status: 'approved' } });
    }

    async getPendingCompensation(ceoId: number): Promise<Compensation[]> {
        const employeesId: number[] = await this._companyBaseService.getEmployeesByCeoId(ceoId);
        const compensations: Compensation[] = [];

        await Promise.all(employeesId.map(async (id: number): Promise<void> => {
            try {
                const compensation: Compensation[] = await this._prismaService.compensation.findMany({
                    where: {
                        employee: id,
                        status: 'pending'
                    }
                });

                if (compensation) {
                    compensations.push(...compensation);
                }
            } catch (err) {
                console.error(`Ошибка при поиске отгула с id ${id}: ${err.message}`);
            }
        }));

        return compensations;

    }

    async updateStatus(dto: NotificationPutStatusDto): Promise<Compensation> {
        if (dto.status === 'approved') {
            const compensation: Compensation = await this._prismaService.compensation.findFirst({where: {id: dto.id}})
            const user = await this._userBaseService.updateUserMissDays(compensation.employee)
            console.log(user);
            return this._prismaService.compensation.update({ where: { id: dto.id }, data: { status: dto.status } });
        } else {
            return this._prismaService.compensation.delete({where: {id: dto.id}})
        }
    }

    updateReviewStatus(dto: NotificationPutStatusDto): Promise<Compensation> {
        return this._prismaService.compensation.update({ where: { id: dto.id }, data: { reviewStatus: false } });
    }
}
