import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CompanyInDto } from '@common';
import { Company } from '@prisma/client'

@Injectable()
export class CompanyService {
    constructor(private _prismaService: PrismaService) {
    }
 
    async getCompany() {

    }

    async postCompany(dto: CompanyInDto) {
        const oldCompany: Company = await this._prismaService.company.findUnique({
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
}
