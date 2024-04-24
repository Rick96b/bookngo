import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @Get('getOne')
  @UseGuards(JwtAuthGuard)
  getUser(@Req() req: Request) {
    return this.usersService.findOne(req);
  }

  @Get('getAll')
  @UseGuards(JwtAuthGuard)
  getAllUsers() {
    return this.usersService.findAll();
  }
}