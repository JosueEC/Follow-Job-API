import { Controller, Body, Param, Get, Post, Delete } from '@nestjs/common';
import { VacancyService } from '../services/vacancy.service';
import { CreateVacancyDto } from '../dto/create-vacancy.dto';
import { UserEntity } from '../../user/entities/user.entity';
import { DeleteVacancyDto } from '../dto/delete-vacancy.dto';
import { InsertResult } from 'typeorm';
import { RelatesVacancyDto } from '../dto/relates-vacancy.dto';
import { VacancyEntity } from '../entities/vacancy.entity';

@Controller('v1/vacancy')
export class VacancyController {
  constructor(private readonly vacancyService: VacancyService) {}

  @Post()
  public async insertOneVacancy(
    @Body() body: CreateVacancyDto,
  ): Promise<InsertResult> {
    return await this.vacancyService.insertOne(body);
  }

  @Post('/information')
  public async relatesVacancy(
    @Body() body: RelatesVacancyDto,
  ): Promise<VacancyEntity> {
    return this.vacancyService.relatesVacancy(body);
  }

  @Get(':vacancyId')
  public async findOneVacancy(
    @Param('vacancyId') vacancyId: string,
  ): Promise<VacancyEntity> {
    return this.vacancyService.findOneWithRelations(vacancyId);
  }

  @Delete()
  public async deleteOneVacancy(
    @Body() body: DeleteVacancyDto,
  ): Promise<UserEntity> {
    return await this.vacancyService.deleteOne(body);
  }
}
