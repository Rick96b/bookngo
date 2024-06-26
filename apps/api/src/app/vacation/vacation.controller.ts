import { Body, Controller, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { VacationService } from './vacation.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { NotificationPutStatusDto, VacationInDto } from '@common';
import { RolesGuard } from '../auth/roles.guard';


@Controller('vacations')
export class VacationController {
    constructor(private readonly vacationService: VacationService) {
    }

    @Get('user/:userId')
    @UseGuards(JwtAuthGuard)
    getVacations(@Param() params: { userId: string }, @Req() req) {
        // получить отпуска пользователя, approved + rejected
        return this.vacationService.getVacations(parseInt(params.userId), req.user);
    }

    @Post('postVacation')
    @UseGuards(JwtAuthGuard)
    createVacation(@Body() dto: VacationInDto) {
        // создать отпуск
        return this.vacationService.postVacation(dto);
    }

    @Get('getPendingVacations')
    @UseGuards(JwtAuthGuard, RolesGuard)
    getPendingVacations(@Req() req) {
        // получить pending отпуска
        return  this.vacationService.getPendingVacations(req.user.id);
    }

    @Put('updateStatus')
    @UseGuards(JwtAuthGuard, RolesGuard)
    updateStatus(@Body() dto: NotificationPutStatusDto) {
        // обновить статус отпуска
        return this.vacationService.updateStatus(dto);
    }

    @Post('updateReviewStatus')
    @UseGuards(JwtAuthGuard)
    updateReviewStatus(@Body() dto: NotificationPutStatusDto) {
        // обновить статус прочитано/не прочитано
        return  this.vacationService.updateReviewStatus(dto);
    }

}
