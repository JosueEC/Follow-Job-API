import { Controller, Body, Param, Post, Get } from '@nestjs/common';
import { CreateOccupationDto } from '../dto/create-occupation.dto';
import { OccupationEntity } from '../entities/occupation.entity';
import { OccupationService } from '../services/occupation.service';

@Controller('/v1/occupation')
export class OccupationController {
  constructor(private readonly occupationService: OccupationService) {}

  @Post(':userId')
  public async createOccupation(
    @Param('userId')
    userId: string,
    @Body()
    occupationDto: CreateOccupationDto,
  ) {
    return await this.occupationService.create(userId, occupationDto);
  }

  @Get()
  public async findAllOccupations(): Promise<OccupationEntity[]> {
    return this.occupationService.findAll();
  }
}
