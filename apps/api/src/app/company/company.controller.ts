import { Controller, Get, Post, Body, HttpCode, Param } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyInDto } from '@common'

@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Get(':company')
  @HttpCode(200)
  getCompany(@Param() params: {company: string}) {
    return this.companyService.getCompany(params.company);
  }

  @Post('company')
  @HttpCode(200)
  postCompany(@Body() dto: CompanyInDto) {
    this.companyService.postCompany(dto)
  }
}
