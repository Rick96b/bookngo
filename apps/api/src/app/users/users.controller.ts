import { Controller, Get, UseGuards, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @Get('getOne')
  @UseGuards(JwtAuthGuard)
  getUser(@Param() params: {email: string}) {
    return this.usersService.findOne(params.email);
  }

  @Get('getAll')
  @UseGuards(JwtAuthGuard)
  getAllUsers() {
    return this.usersService.findAll();
  }
}
