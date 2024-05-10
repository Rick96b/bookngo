import { Module } from '@nestjs/common';
import { VacationService } from './vacation.service';
import { VacationController } from './vacation.controller';
import { PrismaService } from '../../prisma.service';
import { AuthModule } from '../auth/auth.module';
import { CompanyBaseService, UserBaseService } from '../base';
import { RolesGuard } from '../auth/roles.guard';

@Module({
  controllers: [VacationController],
  providers: [VacationService, PrismaService, UserBaseService,CompanyBaseService],
  imports: [AuthModule]
})
export class VacationModule {}
