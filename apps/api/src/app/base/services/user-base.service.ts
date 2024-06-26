import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserBaseService {
    constructor(private _prismaService: PrismaService) {
    }

    async getUser(email: string): Promise<User> {
        return this._prismaService.user.findUnique({
            where: {
                email: email
            }
        });
    }

    async updateUserMissDays(id: number) {
        await this._prismaService.user.update({
            where: { id: id },
            data: { compensationDays: { increment: 1 } }
        });
    }
}
