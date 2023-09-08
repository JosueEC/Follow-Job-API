import { Controller, Param, Body, Post, Get } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { ProfileService } from './profile.service';
import { Profile } from './entities/profile.entity';

@Controller('/v1/profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post(':id')
  public async createProfile(
    @Param('id') id: string,
    @Body() profile: CreateProfileDto,
  ) {
    return await this.profileService.create(id, profile);
  }

  @Get()
  public async getAllProfiles(): Promise<Profile[]> {
    return await this.profileService.findAll();
  }
}
