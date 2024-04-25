import { Controller, Get, Post, Body, Req, HttpCode } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyInDto } from '@common'

@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Get('company')
  @HttpCode(200)
  getCompany(@Req() req: Request) {
    return this.companyService;
  }

  @Post('company')
  @HttpCode(200)
  postCompany(@Body() dto: CompanyInDto) {
    this.companyService.postCompany(dto)
  }
}
