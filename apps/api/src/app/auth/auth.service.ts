import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as argon2 from 'argon2';
import { UserBaseInfoDto, UserLoginDto } from '@common';
import { PrismaService } from '../../prisma.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { CompanyBaseService } from '../base';


@Injectable()
export class AuthService {
  constructor(
    private _prismaService: PrismaService,
    private _jwtService: JwtService,
    private companyBaseService: CompanyBaseService
  ) {
  }

  async login(dto: UserLoginDto): Promise<{ token: string }> {
    const user: User = await this.validateUser(dto);
    return await this.generateToken(user);
  }

  async registerUser(dto: UserBaseInfoDto): Promise<{ token: string }> {
    const isUserExist = await this.IsUserExist(dto)
    const isCompanyExist = await this.IsCompanyExist(dto)
    const isDepartmentExist = await this.IsDepartmentExist(dto)
    if (isUserExist) {
      throw new BadRequestException({message: 'User with this email already exist'});
    }
    if (!isCompanyExist) {
      throw new BadRequestException({message: 'Company does not exist'});
    }
    if(!isDepartmentExist) {
      throw new BadRequestException({message: 'Department does not exist'});
    }

    const user: User = await this._prismaService.user.create({
      data: { ...dto, password: await argon2.hash(dto.password) }
    });
    await this.companyBaseService.addEmployeeToCompany(user.id, user.companyName)

    return await this.generateToken(user);
  }

  async registerCeo(dto: UserBaseInfoDto): Promise<{ token: string }> {
    const isUserExist = await this.IsUserExist(dto)
    const isCompanyExist = await this.IsCompanyExist(dto)
    if (isUserExist) {
      throw new BadRequestException({message: 'User with this email already exist'});
    }
    if (isCompanyExist) {
      console.log(this.IsCompanyExist(dto))
      throw new BadRequestException({message: 'Company already exist'});
    }

    const user: User = await this._prismaService.user.create({
      data: { ...dto, password: await argon2.hash(dto.password), reviewStatus: true }
    });
    await this.companyBaseService.postCompany({
      name: dto.companyName,
      ceo: user.id,
      departments: [],
      employees: []
    })

    return await this.generateToken(user);
  }

  private async validateUser(dto: UserLoginDto) {
    const user = await this._prismaService.user.findUnique({
      where: {
        email: dto.email
      }
    });

    if (user) {
      const passwordEquals: boolean = await argon2.verify(user.password, dto.password);
      if (passwordEquals) {
        return user;
      }
    }

    throw new UnauthorizedException({
      message: 'Incorrect email or password'
    });
  }


  private async generateToken(user: User): Promise<{ token: string }> {
    const payload = { email: user.email, id: user.id };
    return {
      token: this._jwtService.sign(payload)
    };
  }

  private async IsUserExist(dto: UserBaseInfoDto) {
    const oldUser: User | null = await this._prismaService.user.findUnique({
      where: {
        email: dto.email
      }
    });

    return !!oldUser
  }

  private async IsCompanyExist(dto: UserBaseInfoDto) {
    const company = await this.companyBaseService.getCompany(dto.companyName)
    return !!company
  }

  private async IsDepartmentExist(dto: UserBaseInfoDto) {
    const departments = await this.companyBaseService.getDepartments(dto.companyName)
    return departments.includes(dto.companyDepartment)
  }
}
