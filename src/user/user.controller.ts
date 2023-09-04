import { Controller, Body, Param, Post, Get } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

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
}
