import { Controller, Body, Param, Post, Delete } from '@nestjs/common';
import { VacancyService } from '../services/vacancy.service';
import { CreateVacancyDto } from '../dto/create-vacancy.dto';
import { VacancyEntity } from '../entities/vacancy.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { DeleteVacancyDto } from '../dto/delete-vacancy.dto';

@Controller('v1/vacancy')
export class VacancyController {
  constructor(private readonly vacancyService: VacancyService) {}

  @Post(':userId')
  public async createOneVacancy(
    @Param('userId') userId: string,
    @Body() body: CreateVacancyDto,
  ): Promise<VacancyEntity> {
    return await this.vacancyService.create(userId, body);
  }

  @Delete()
  public async deleteOneVacancy(
    @Body() body: DeleteVacancyDto,
  ): Promise<UserEntity> {
    return await this.vacancyService.delete(body);
  }
}
