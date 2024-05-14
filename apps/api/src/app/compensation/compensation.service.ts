import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CompanyBaseService, UserBaseService } from '../base';
import { CompensationDto, NotificationPutStatusDto, UserDto } from '@common';
import { Compensation, User } from '@prisma/client';
import { addWarning } from '@angular-devkit/build-angular/src/utils/webpack-diagnostics';

@Injectable()
export class CompensationService {

    constructor(private _prismaService: PrismaService, private _userBaseService: UserBaseService, private _companyBaseService: CompanyBaseService) {
    }

    async postCompensation(dto: CompensationDto): Promise<Compensation> {
        const oldCompensation: Compensation = await this._prismaService.compensation
            .findFirst({ where: { employee: dto.employee, date: dto.date } });

        if (oldCompensation) {
            throw new BadRequestException('Compensation already exist');
        }

        return this._prismaService.compensation.create({ data: dto });
    }

    async getCompensation(id: number, userDto: UserDto) {
        const user: User = await this._userBaseService.getUser(userDto.email);
        if (user.status === 'pending') {
            return [];
        }

        return this._prismaService.compensation.findMany({ where: { employee: id } });
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
            const compensation: Compensation = await this._prismaService.compensation.findFirst({ where: { id: dto.id } });
            await this._userBaseService.updateUserMissDays(compensation.employee);
            return this._prismaService.compensation.update({
                where: { id: dto.id },
                data: { status: dto.status, reviewStatus: true }
            });
        } else {
            return this._prismaService.compensation.update({
                where: { id: dto.id },
                data: { status: dto.status, reviewStatus: true }
            });
        }
    }

    async updateReviewStatus(dto: NotificationPutStatusDto): Promise<Compensation> {
        const compensation: Compensation = await this._prismaService.compensation.findFirst({ where: { id: dto.id } });
        if (compensation.status === 'rejected') {
            return this._prismaService.compensation.delete({ where: { id: dto.id } });
        } else {
            return this._prismaService.compensation.update({ where: { id: dto.id }, data: { reviewStatus: false } });
        }
    }
}
