import { Controller } from '@nestjs/common';
import { CreateOccupationDto } from './dto/create-occupation.dto';
import { Occupation } from './entities/occupation.entity';
import { OccupationService } from './occupation.service';

@Controller('/v1/occupation')
export class OccupationController {
  constructor(private readonly occupationService: OccupationService) {}

  public async createOccupation(
    occupationDto: CreateOccupationDto,
  ): Promise<Occupation> {
    return await this.occupationService.create(occupationDto);
  }
}
