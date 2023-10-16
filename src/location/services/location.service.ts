import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LocationEntity } from '../entities/location.entity';
import { InsertResult, Repository } from 'typeorm';
import { CreateLocationDto } from '../dto/create-location.dto';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(LocationEntity)
    private readonly locationRepository: Repository<LocationEntity>,
  ) {}

  public async insert(body: CreateLocationDto): Promise<InsertResult> {
    try {
      return await this.locationRepository.insert(body);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findOne(locationId: string): Promise<LocationEntity> {
    try {
      const location = await this.locationRepository
        .createQueryBuilder('location')
        .where('location.id = :locationId', { locationId })
        .getOne();

      if (!location) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Location not found',
        });
      }

      return location;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
