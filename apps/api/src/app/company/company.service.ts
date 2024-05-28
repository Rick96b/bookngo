import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { AddDepartmentDto, CompanyInDto } from '@common';
import { Company } from '@prisma/client'

@Injectable()
export class CompanyService {
    constructor(private _prismaService: PrismaService) {
    }
 
    async getCompany(name: string) {
        return await this._prismaService.company.findUnique({
            where: {
                name: name
            }
        });
    }

    async postCompany(dto: CompanyInDto) {
        const oldCompany: Company | null = await this._prismaService.company.findUnique({
            where: {
                name: dto.name
            }
        });

        if (oldCompany) {
            throw new BadRequestException('Company already exist');
        }

        const company: Company = await this._prismaService.company.create({
            data: dto
        });
    }


    async addDepartment(dto: AddDepartmentDto) {
        await this._prismaService.company.update({
            where: {
              id: dto.companyId,
            },
            data: {
              departments: {
                push: dto.department
              },
            },
          })
    }
}
