import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from '../prisma.service';
import { UsersModule } from './users/users.module';
import { CompanyModule } from './company/company.module';
import { VacationModule } from './vacation/vacation.module';
import { CompensationModule } from './compensation/compensation.module';

@Module({
    imports: [
        AuthModule,
        UsersModule,
        CompanyModule,
        VacationModule,
        CompensationModule,
    ],
    controllers: [AppController],
    providers: [AppService, PrismaService],
})
export class AppModule {}
