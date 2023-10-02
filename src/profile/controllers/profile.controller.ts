import { Controller, Param, Body, Post, Get, Delete } from '@nestjs/common';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { ProfileService } from '../services/profile.service';
import { ProfileEntity } from '../entities/profile.entity';

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
  public async getAllProfiles(): Promise<ProfileEntity[]> {
    return await this.profileService.findAll();
  }

  @Get(':profileId')
  public async getOneProfile(
    @Param('profileId') profileId: string,
  ): Promise<ProfileEntity> {
    return await this.profileService.findOne(profileId);
  }

  @Delete(':userId')
  public async deleteProfile(@Param('userId') userId: string) {
    return await this.profileService.delete(userId);
  }
}
