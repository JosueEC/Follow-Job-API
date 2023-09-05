import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './entities/profile.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    private readonly userService: UserService,
  ) {}

  public async create(id: string, profile: CreateProfileDto): Promise<Profile> {
    const userFound = await this.userService.findOne(id);

    const profileCreated = this.profileRepository.create(profile);
    const profileSaved = await this.profileRepository.save(profileCreated);

    userFound.profile = profileSaved;
    await this.userService.save(userFound);

    return profileSaved;
  }
}
