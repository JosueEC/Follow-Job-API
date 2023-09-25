import {
  Controller,
  Body,
  Param,
  Post,
  Get,
  Patch,
  Delete,
  HttpCode,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserEntity } from '../entities/user.entity';
import { UserService } from '../services/user.service';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserFiltersService } from '../services/filters.service';

@Controller('/v1/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userFiltersService: UserFiltersService,
  ) {}

  @Post()
  public async createUser(@Body() user: CreateUserDto): Promise<UserEntity> {
    return this.userService.create(user);
  }

  @Get()
  public async getAllUsers(
    @Query('addProfile') addProfile: boolean,
    @Query('addOccupations') addOccupations: boolean,
  ): Promise<UserEntity[]> {
    if (addProfile && addOccupations) {
      return this.userFiltersService.findAllAddRelations();
    } else if (addProfile) {
      return await this.userFiltersService.findAllAddProfile();
    } else if (addOccupations) {
      return await this.userFiltersService.findAllAddOccupations();
    }
    return await this.userService.findAll();
  }

  @Get(':id')
  public async getOneUser(@Param('id') id: string): Promise<UserEntity> {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  public async updateUser(
    @Param('id') id: string,
    @Body() user: UpdateUserDto,
  ): Promise<UserEntity> {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  @HttpCode(204)
  public async deleteOneUser(@Param('id') id: string): Promise<UserEntity> {
    return await this.userService.deleteOne(id);
  }
}
