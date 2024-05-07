import { BadRequestException, Injectable } from '@nestjs/common';
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

    async findUsersById(usersId: number[]): Promise<User[]> {
        const users: User[] = [];

        if (!usersId) {
            throw new BadRequestException({ message: 'Не переданы id пользователей' });
        }

        await Promise.all(usersId.map(async (id: number): Promise<void> => {
            try {
                const user: User = await this._prismaService.user.findFirstOrThrow({
                    where: {
                        id: id
                    }
                });

                if (user) {
                    delete user.password;
                    users.push(user);
                }
            } catch (err) {
                console.error(`Ошибка при поиске пользователя с id ${id}: ${err.message}`);
            }

        }));

        return users;

    }
}
