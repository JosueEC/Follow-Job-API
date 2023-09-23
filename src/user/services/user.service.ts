import {
  Injectable,
  ConflictException,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserEntity } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async exists(email: string): Promise<boolean> {
    const userFound = await this.userRepository.findOneBy({ email });

    return userFound ? true : false;
  }

  public async create(user: CreateUserDto): Promise<UserEntity> {
    const userExists = await this.exists(user.email);

    if (userExists) {
      throw new ConflictException(`The e-mail ${user.email} is already in use`);
    }

    const userCreated = this.userRepository.create(user);
    return await this.userRepository.save(userCreated);
  }

  public async save(user: CreateUserDto): Promise<UserEntity> {
    return await this.userRepository.save(user);
  }

  public async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  public async findOne(id: string): Promise<UserEntity> {
    const userFound = await this.userRepository
      .createQueryBuilder('user')
      .where({ id })
      .getOne();

    if (!userFound) {
      throw new NotFoundException('User not found');
    }

    return userFound;
  }

  public async findByEmail(email: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOneBy({ email });
  }

  public async update(id: string, user: UpdateUserDto): Promise<UserEntity> {
    await this.findOne(id);

    const result = await this.userRepository.update(id, user);

    if (result.affected === 0) {
      throw new ServiceUnavailableException(
        'Something went wrong, try it later',
      );
    }

    return this.findOne(id);
  }

  public async deleteOne(id: string): Promise<UserEntity> {
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
