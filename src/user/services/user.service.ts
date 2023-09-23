import {
  Injectable,
  ConflictException,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';

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

  public async save(user: CreateUserDto): Promise<User> {
    return await this.userRepository.save(user);
  }

  public async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  public async findOne(id: string): Promise<User> {
    const userFound = await this.userRepository.findOneBy({ id });

    if (!userFound) {
      throw new NotFoundException('User not found');
    }

    return userFound;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ email });
  }

  public async update(id: string, user: UpdateUserDto): Promise<User> {
    await this.findOne(id);
    const result = await this.userRepository.update(id, user);

    if (result.affected === 0) {
      throw new ServiceUnavailableException(
        'Something went wrong, try it later',
      );
    }

    return this.findOne(id);
  }

  public async deleteOne(id: string): Promise<User> {
    const userFound = await this.findOne(id);

    const result = await this.userRepository.delete(id);

    if (result.affected === 0) {
      throw new ServiceUnavailableException(
        'Something went wrong, try it later',
      );
    }

    return userFound;
  }
}
