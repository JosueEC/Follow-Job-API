import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OccupationEntity } from '../entities/occupation.entity';
import { Repository } from 'typeorm';
import { CreateOccupationDto } from '../dto/create-occupation.dto';
import { UserService } from '../../user/services/user.service';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class OccupationService {
  constructor(
    @InjectRepository(OccupationEntity)
    private readonly occupationRepository: Repository<OccupationEntity>,
    private readonly userService: UserService,
  ) {}

  public async create(body: CreateOccupationDto): Promise<OccupationEntity> {
    try {
      const userFound = await this.userService.findOne(body.professionalId);

      if (!userFound) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'User not found :(',
        });
      }

      const newOccupation = this.occupationRepository.create(body);
      return await this.occupationRepository.save(newOccupation);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findAll(): Promise<OccupationEntity[]> {
    try {
      return await this.occupationRepository.find();
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
