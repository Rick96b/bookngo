import { VacationInDto } from '@common';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Vacation } from '@prisma/client';

@Injectable()
export class VacationService {
    constructor(private _prismaService: PrismaService) {
    }
 
    async getVacations(userId: number) {
        return await this._prismaService.vacation.findMany({
            where: {
                employee: userId
            }
        });
    }

    async postVacation(dto: VacationInDto) {
        const oldVacation: Vacation = await this._prismaService.vacation.findFirst({
            where: {
                startDate: dto.startDate,
                endDate: dto.endDate
            }
        });

        if (oldVacation) {
            throw new BadRequestException('Vacation already exist');
        }

        this._prismaService.vacation.create({
            data: dto
        });
    }
}
