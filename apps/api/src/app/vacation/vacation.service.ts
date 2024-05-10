import { UserDto, VacationInDto, VacationOutDto } from '@common';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { User, Vacation } from '@prisma/client';
import { CompanyBaseService, UserBaseService } from '../base';

@Injectable()
export class VacationService {
    constructor(private _prismaService: PrismaService, private _userBaseService: UserBaseService, private _companyBaseService: CompanyBaseService) {
    }

    async getVacations(userId: number) {
        return this._prismaService.vacation.findMany({
            where: {
                employee: userId,
                status: 'approved'
            }
        });
    }

    async postVacation(dto: VacationInDto) {

        const oldVacation: Vacation = await this._prismaService.vacation.findFirst({
            where: {
                employee: dto.employee,
                startDate: dto.startDate,
                endDate: dto.endDate
            }
        });

        if (oldVacation) {
            throw new BadRequestException('Vacation already exist');
        }

        return this._prismaService.vacation.create({
            data: dto
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

    async updateStatus(dto: VacationOutDto): Promise<Vacation> {
        console.log(dto);
        return this._prismaService.vacation.update({
            where: {
                id: dto.id
            },
            data: {
                status: dto.status
            }
        })
    }
}
