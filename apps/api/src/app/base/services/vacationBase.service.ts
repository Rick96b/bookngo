import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { Vacation } from '@prisma/client';

@Injectable()
export class VacationBaseService {
    constructor(private _prismaService: PrismaService) {
    }

    async getVacationsById(userId: number): Promise<Vacation[]> {
        return this._prismaService.vacation.findMany({
            where: {
                employee: userId,
                status: 'approved'
            }
        });
    }
}
