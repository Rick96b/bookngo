import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { UserBaseService } from '../base';
import { User } from '@prisma/client';

@Injectable()
export class RolesGuard implements CanActivate {

    constructor( private _userBaseService: UserBaseService) {
    }
    async canActivate(context: ExecutionContext): Promise<boolean> {

        const req = context.switchToHttp().getRequest();

        try {
            const user: User =  await  this._userBaseService.getUser(req.user.email);
            if (user.employmentStatus !== 'ceo') {
                throw new ForbiddenException('Access denied. You do not have the required role.');
            }
            return true;

        } catch (e) {
            throw new UnauthorizedException({ message: 'Пользователь не авторизован' });
        }
    }
}
