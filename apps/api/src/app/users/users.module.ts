import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '../../prisma.service';
import { AuthModule } from '../auth/auth.module';
import { CompanyBaseService, UserBaseService, VacationBaseService } from '../base';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, VacationBaseService, CompanyBaseService, UserBaseService],
  imports: [AuthModule]
})
export class UsersModule {}
