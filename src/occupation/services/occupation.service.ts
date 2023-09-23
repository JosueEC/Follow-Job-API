import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Occupation } from '../entities/occupation.entity';
import { Repository } from 'typeorm';
import { CreateOccupationDto } from '../dto/create-occupation.dto';
import { UserService } from '../../user/services/user.service';

@Injectable()
export class OccupationService {
  constructor(
    @InjectRepository(Occupation)
    private readonly occupationRepository: Repository<Occupation>,
    private readonly userService: UserService,
  ) {}

  public async create(occupationDto: CreateOccupationDto): Promise<Occupation> {
    const userFound = await this.userService.findOne(
      occupationDto.professionalId,
    );

    if (!userFound) {
      throw new NotFoundException('User not found :(');
    }

    const newOccupation = this.occupationRepository.create(occupationDto);
    return await this.occupationRepository.save(newOccupation);
  }

  public async findAll(): Promise<Occupation[]> {
    return await this.occupationRepository.find();
  }
}
