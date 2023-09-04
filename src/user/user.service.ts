import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  public async exists(email: string): Promise<boolean> {
    const userFound = await this.userRepository.findOneBy({ email });

    return userFound ? true : false;
  }

  public async create(user: CreateUserDto): Promise<User> {
    const userExists = await this.exists(user.email);

    if (userExists) {
      throw new ConflictException(`The e-mail ${user.email} is already in use`);
    }

    const userCreated = this.userRepository.create(user);
    return await this.userRepository.save(userCreated);
  }

  public async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
}
