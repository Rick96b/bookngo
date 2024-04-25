import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as argon2 from 'argon2';
import { UserBaseInfoDto, UserLoginDto } from '@common';
import { PrismaService } from '../../prisma.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';


@Injectable()
export class AuthService {
  constructor(private _prismaService: PrismaService, private _jwtService: JwtService) {
  }

  async login(dto: UserLoginDto): Promise<{ token: string }> {
    const user: User = await this.validateUser(dto);
    return await this.generateToken(user);
  }

  private async validateUser(dto: UserLoginDto) {
    const user = await this._prismaService.user.findUnique({
      where: {
        email: dto.email
      }
    });
    const passwordEquals: boolean = await argon2.verify(user.password, dto.password);

    if (user && passwordEquals) {
      return user;
    }

    throw new UnauthorizedException({
      message: 'Incorrect email or password'
    });
  }
  async register(dto: UserBaseInfoDto): Promise<{ token: string }> {
    const oldUser: User | null = await this._prismaService.user.findUnique({
      where: {
        email: dto.email
      }
    });

    if (oldUser) {
      throw new BadRequestException('User already exist');
    }

    const user: User = await this._prismaService.user.create({
      data: { ...dto, password: await argon2.hash(dto.password) }
    });

    return await this.generateToken(user);
  }
  private async generateToken(user: User): Promise<{ token: string }> {
    const payload = { email: user.email, id: user.id };
    return {
      token: this._jwtService.sign(payload)
    };
  }
}
