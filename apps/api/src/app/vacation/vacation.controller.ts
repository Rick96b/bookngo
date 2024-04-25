import { Controller, Get, UseGuards, Param, Post, Body } from '@nestjs/common';
import { VacationService } from './vacation.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { VacationInDto } from '@common';


@Controller('vacations')
export class VacationController {
  constructor(private readonly vacationService: VacationService) {
  }

  @Get('getVacations')
  @UseGuards(JwtAuthGuard)
  getUser(@Param() params: {vacationsId: number[]}) {
    return this.vacationService.getVacations(params.vacationsId);
  }

  @Post('postVacation')
  @UseGuards(JwtAuthGuard)
  getAllUsers(@Body() dto: VacationInDto) {
    return this.vacationService.postVacation(dto);
  }
}
