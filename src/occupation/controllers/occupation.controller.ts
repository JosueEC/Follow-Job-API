import { Controller, Body, Param, Post, Get } from '@nestjs/common';
import { OccupationEntity } from '../entities/occupation.entity';
import { OccupationService } from '../services/occupation.service';
import { CreateOccupationSkillDto } from '../dto/create-occupation-skill.dto';

@Controller('/v1/occupation')
export class OccupationController {
  constructor(private readonly occupationService: OccupationService) {}

  @Post(':userId')
  public async createOccupation(
    @Param('userId')
    userId: string,
    @Body()
    body: CreateOccupationSkillDto,
  ) {
    return await this.occupationService.create(userId, body);
  }

  @Get()
  public async findAllOccupations(): Promise<OccupationEntity[]> {
    return this.occupationService.findAll();
  }
}
