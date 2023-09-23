import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { ProfileEntity } from '../entities/profile.entity';
import { UserService } from '../../user/services/user.service';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
    private readonly userService: UserService,
  ) {}

  public async create(
    id: string,
    profile: CreateProfileDto,
  ): Promise<ProfileEntity> {
    const userFound = await this.userService.findOne(id);

    const profileCreated = this.profileRepository.create(profile);
    const profileSaved = await this.profileRepository.save(profileCreated);

    userFound.profile = profileSaved;
    await this.userService.save(userFound);

    return profileSaved;
  }

  public async findAll(): Promise<ProfileEntity[]> {
    return this.profileRepository.find();
  }
}
