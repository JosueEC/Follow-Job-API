import { Controller, Body, Post } from '@nestjs/common';
import { LocationService } from '../services/location.service';
import { CreateLocationDto } from '../dto/create-location.dto';
import { InsertResult } from 'typeorm';

@Controller('v1/location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  public async findOneLocation(
    @Body() body: CreateLocationDto,
  ): Promise<InsertResult> {
    return this.locationService.insert(body);
  }
}
