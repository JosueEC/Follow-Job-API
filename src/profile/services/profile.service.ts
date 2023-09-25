import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { ProfileEntity } from '../entities/profile.entity';
import { UserService } from '../../user/services/user.service';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>,
    private readonly userService: UserService,
  ) {}

  public async create(
    id: string,
    body: CreateProfileDto,
  ): Promise<ProfileEntity> {
    try {
      const userFound = await this.userService.findOne(id);

      if (!userFound) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'User not found : (',
        });
      }

      const profileCreated = this.profileRepository.create(body);
      const profileSaved = await this.profileRepository.save(profileCreated);

      userFound.profile = profileSaved;
      await this.userService.save(userFound);

      return profileSaved;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findAll(): Promise<ProfileEntity[]> {
    try {
      return this.profileRepository.find();
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
