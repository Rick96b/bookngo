import { Body, Controller, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { NotificationPutStatusDto, UserDto } from '@common';
import { RolesGuard } from '../auth/roles.guard';


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    @Get('getOne')
    @UseGuards(JwtAuthGuard)
    getUser(@Req() req) {
        return this.usersService.findOne(req.user);
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

    @Get('getPendingUsers')
    @UseGuards(JwtAuthGuard, RolesGuard)
    getPendingUsers(@Req() req) {
        return this.usersService.getPendingUsers(req.user.id);
    }

    @Get('updateReviewStatus')
    @UseGuards(JwtAuthGuard)
    updateReviewStatus(@Req() req) {
        return this.usersService.updateReviewStatus(req.user.id);
    }

    @Put('updateStatus')
    @UseGuards(JwtAuthGuard, RolesGuard)
    async updateStatus(@Body() dto: NotificationPutStatusDto) {
        return await this.usersService.updateStatus(dto);
    }
}
