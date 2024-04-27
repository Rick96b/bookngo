import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { PrismaService } from '../../prisma.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [CompanyController],
  providers: [CompanyService, PrismaService],
  imports: [AuthModule]
})
export class CompanyModule {}
