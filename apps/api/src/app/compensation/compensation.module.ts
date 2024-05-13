import { Module } from '@nestjs/common';
import { CompensationService } from './compensation.service';
import { CompensationController } from './compensation.controller';
import { CompanyBaseService, UserBaseService } from '../base';
import { PrismaService } from '../../prisma.service';
import { VacationService } from '../vacation/vacation.service';
import { AuthModule } from '../auth/auth.module';

@Module({
    controllers: [CompensationController],
    providers: [CompensationService, PrismaService, UserBaseService, CompanyBaseService],
    imports: [AuthModule]
})


export class CompensationModule {
}
