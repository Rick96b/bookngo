import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { User } from '@prisma/client';
import { UserDto } from '@common';


@Injectable()
export class UsersService {

    constructor(private _prismaService: PrismaService) {
    }

    async findOne(req: any): Promise<User> {
        //протипзировать
        const user: User | null = await this._prismaService.user.findUnique({
            where: {
                email: req.user.email
            }
        });

        return user;
    }

    async findAll() {
        const users: User[] | null = await this._prismaService.user.findMany();
        users.forEach((item: User) => delete item.password);
        return users;
    }

    async updateOne(dto: UserDto) {
        return this._prismaService.user.update({
            where: {
                email: dto.email
            },
            data: {
                ...dto
            }
        });
    }
}
