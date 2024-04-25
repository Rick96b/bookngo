import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { User } from '@prisma/client';


@Injectable()
export class UsersService {

  constructor(private _prismaService: PrismaService) {
  }
  async findOne(email: string): Promise<User> {
    const user: User | null = await this._prismaService.user.findUnique({
      where: {
        email: email
      }
    });

    return user;
  }

  async findAll() {
    const users: User[] | null = await this._prismaService.user.findMany();
    users.forEach((item: User) => delete item.password);
    return users;
  }
}
