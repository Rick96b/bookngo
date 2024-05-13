import { Body, Controller, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { CompensationService } from './compensation.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { NotificationPutStatusDto } from '@common';
import { RolesGuard } from '../auth/roles.guard';
import { CompensationDto } from '@common';

@Controller('compensation')
export class CompensationController {
    constructor(private readonly compensationService: CompensationService) {
    }

    @Post('postCompensation')
    @UseGuards(JwtAuthGuard)
    createCompensation(@Body() dto: CompensationDto) {
        return this.compensationService.postCompensation(dto);
    }

    @Get('user/:userId')
    @UseGuards(JwtAuthGuard)
    getCompensation(@Param() params: { userId: string }, @Req() req) {
        return this.compensationService.getCompensation(parseInt(params.userId), req.user);
    }

    @Get('getPendingCompensations')
    @UseGuards(JwtAuthGuard, RolesGuard)
    getPendingCompensation(@Req() req) {
        return this.compensationService.getPendingCompensation(req.user.id);
    }

    @Put('updateStatus')
    @UseGuards(JwtAuthGuard, RolesGuard)
    updateStatus(@Body() dto: NotificationPutStatusDto) {
      return this.compensationService.updateStatus(dto);

    }

    @Post('updateReviewStatus')
    @UseGuards(JwtAuthGuard)
    updateReviewStatus(@Body() dto: NotificationPutStatusDto) {
        return this.compensationService.updateReviewStatus(dto);
    }
}
