import { Controller, Param, Body, Post } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { ProfileService } from './profile.service';

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
}
