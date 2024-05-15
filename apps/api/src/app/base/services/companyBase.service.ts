import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { CompanyInDto } from '@common';
import { Company } from '@prisma/client';

@Injectable()
export class CompanyBaseService {
    constructor(private _prismaService: PrismaService) {
    }

    async getCompany(name: string) {
        return this._prismaService.company.findUnique({
            where: {
                name: name
            }
        });
    }

    async postCompany(dto: CompanyInDto) {
        return this._prismaService.company.create({
            data: dto
        });
    }

    async addEmployeeToCompany(userId: number, companyName: string) {
        return this._prismaService.company.update({
            where: {
                name: companyName
            },
            data: {
                employees: {
                    push: userId
                }
            }
        });
    }

    async getDepartments(companyName: string) {
        return (await this.getCompany(companyName)).departments;
    }

    async getEmployeesByCeoId(ceoId: number): Promise<number[]> {
        const company: Company = await this._prismaService.company.findFirst({
            where: {
                ceo: ceoId
            }
        });

        return company.employees;
    }
}
