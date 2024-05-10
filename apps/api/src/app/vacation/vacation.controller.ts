import { Controller, Get, UseGuards, Param, Post, Body, Req, Res } from '@nestjs/common';
import { VacationService } from './vacation.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { VacationInDto } from '@common';
import { RolesGuard } from '../auth/roles.guard';
import { Vacation } from '@prisma/client';


@Controller('vacations')
export class VacationController {
    constructor(private readonly vacationService: VacationService) {
    }

    @Get('user/:userId')
    @UseGuards(JwtAuthGuard)
    getVacations(@Param() params: { userId: string }) {
        return this.vacationService.getVacations(parseInt(params.userId));
    }

    @Post('postVacation')
    @UseGuards(JwtAuthGuard)
    createVacation(@Body() dto: VacationInDto) {
        return this.vacationService.postVacation(dto);
    }

    @Get('getPendingVacations')
    @UseGuards(JwtAuthGuard, RolesGuard)
    getPendingVacations(@Req() req) {
        return  this.vacationService.getPendingVacations(req.user.id);
    }

}
