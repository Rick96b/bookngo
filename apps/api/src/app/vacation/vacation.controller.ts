import { Controller, Get, UseGuards, Param, Post, Body } from '@nestjs/common';
import { VacationService } from './vacation.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { VacationInDto } from '@common';


@Controller('vacations')
export class VacationController {
  constructor(private readonly vacationService: VacationService) {
  }

  @Get(':userId')
  @UseGuards(JwtAuthGuard)
  getVacations(@Param() params: {userId: string}) {
    return this.vacationService.getVacations(parseInt(params.userId));
  }

  @Post('postVacation')
  @UseGuards(JwtAuthGuard)
  setVacation(@Body() dto: VacationInDto) {
    return this.vacationService.postVacation(dto);
  }
}
