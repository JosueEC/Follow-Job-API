import {
  Controller,
  Body,
  Param,
  Post,
  Get,
  Patch,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  public async createUser(@Body() user: CreateUserDto): Promise<User> {
    return this.userService.create(user);
  }

  @Get()
  public async getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  public async getOneUser(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  public async updateUser(
    @Param('id') id: string,
    @Body() user: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  @HttpCode(204)
  public async deleteOneUser(@Param('id') id: string): Promise<User> {
    return await this.userService.deleteOne(id);
  }
}
