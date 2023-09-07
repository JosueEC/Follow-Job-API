import { Controller, Body, Post, Get } from '@nestjs/common';
import { CreateOccupationDto } from './dto/create-occupation.dto';
import { Occupation } from './entities/occupation.entity';
import { OccupationService } from './occupation.service';

@Controller('/v1/occupation')
export class OccupationController {
  constructor(private readonly occupationService: OccupationService) {}

  @Post()
  public async createOccupation(
    @Body()
    occupationDto: CreateOccupationDto,
  ): Promise<Occupation> {
    return await this.occupationService.create(occupationDto);
  }

  @Get()
  public async findAllOccupations(): Promise<Occupation[]> {
    return this.occupationService.findAll();
  }
}
