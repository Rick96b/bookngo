import { Module } from '@nestjs/common';
import { VacationService } from './vacation.service';
import { VacationController } from './vacation.controller';
import { PrismaService } from '../../prisma.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [VacationController],
  providers: [VacationController, PrismaService],
  imports: [AuthModule]
})
export class UsersModule {}
