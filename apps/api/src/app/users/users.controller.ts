import { Body, Controller, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserDto } from '@common';


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @Get('getOne')
    @UseGuards(JwtAuthGuard)
    getUser(@Req() req: Request) {
        //
        return this.usersService.findOne(req);
    }

    @Get('getAll')
    @UseGuards(JwtAuthGuard)
    getAllUsers(@Req() req: Request) {
        return this.usersService.findAll();
    }

    @Post('getUsersById')
    @UseGuards(JwtAuthGuard)
    getUsersById(@Body() body: any) {
        return this.usersService.findUsersById(body.id);
    }

    @Put('updateOne')
    @UseGuards(JwtAuthGuard)
    updateUser(@Body() dto: UserDto) {
        return this.usersService.updateOne(dto);
    }
}
