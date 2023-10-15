import { Controller, Body, Param, Post, Get, Delete } from '@nestjs/common';
import { CompanyService } from '../services/company.service';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { DeleteResult, InsertResult } from 'typeorm';
import { CompanyEntity } from '../entities/company.entity';
import { RelatesCompanyDto } from '../dto/relates-company.dto';

@Controller('v1/company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  public async insertCompany(
    @Body() body: CreateCompanyDto,
  ): Promise<InsertResult> {
    return await this.companyService.insert(body);
  }

  @Post('/information')
  public async updateCompanyRelations(
    @Body() body: RelatesCompanyDto,
  ): Promise<CompanyEntity> {
    return await this.companyService.updateRelations(body);
  }

  @Get(':companyId')
  public async findOneCompany(
    @Param('companyId') companyId: string,
  ): Promise<CompanyEntity> {
    return await this.companyService.findOne(companyId);
  }

  @Delete(':companyId')
  public async deleteOneCompany(
    @Param('companyId') companyId: string,
  ): Promise<DeleteResult> {
    return await this.companyService.delete(companyId);
  }
}
