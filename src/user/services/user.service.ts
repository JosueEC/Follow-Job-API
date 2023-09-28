import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserEntity } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ErrorManager } from '../../utils/error.manager';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async create(body: CreateUserDto): Promise<UserEntity> {
    try {
      const userExists = await this.userRepository.findOneBy({
        email: body.email,
      });

      if (userExists) {
        throw new ErrorManager({
          type: 'CONFLICT',
          message: `The email ${body.email} is already in use`,
        });
      }

      const newUser = this.userRepository.create(body);
      return await this.userRepository.save(newUser);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async save(user: CreateUserDto): Promise<UserEntity> {
    try {
      return await this.userRepository.save(user);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findAll(): Promise<UserEntity[]> {
    try {
      return this.userRepository.find();
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findOne(id: string): Promise<UserEntity> {
    try {
      const userFound = await this.userRepository
        // El parametro que recibe la instruccion createQueryBuilder
        // es el alias que se le da al resultado
        .createQueryBuilder('user')
        // La instruccion select nos permite elejir columnas
        // especificas en la consulta, si solo es una esta puede
        // ir en comillas simples, cuando son varias deben ir
        // en un arreglo
        // .select(['user.id AS id', 'user.email AS email', 'user.profile'])
        .leftJoinAndSelect('user.profile', 'profile')
        // Esta forma en la que se usa el where es para evitar
        // los ataques por inyeccion SQL
        .where('user.id = :userId', { userId: id })
        //* Nota: En consultas que usan la instruccion select
        //* estas se deben obtener con Raw(getRawOne, getRawMany)
        .getOne();

      if (!userFound) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'User not found :(',
        });
      }

      return userFound;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findByEmail(email: string): Promise<UserEntity | undefined> {
    try {
      return this.userRepository
        .createQueryBuilder('user')
        .where({ email })
        .getOne();
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async update(id: string, user: UpdateUserDto): Promise<UserEntity> {
    try {
      const userExists = await this.userRepository
        .createQueryBuilder('user')
        .where({ id })
        .getOne();

      if (!userExists) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'User not found :(',
        });
      }

      const result = await this.userRepository.update(id, user);

      if (result.affected === 0) {
        throw new ErrorManager({
          type: 'NOT_MODIFIED',
          message: 'Something went wrong, try it later',
        });
      }

      return this.userRepository
        .createQueryBuilder('user')
        .where({ id })
        .getOne();
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async deleteOne(id: string): Promise<UserEntity> {
    try {
      const userFound = await this.userRepository
        .createQueryBuilder('user')
        .where({ id })
        .getOne();

      if (!userFound) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'User not found : (',
        });
      }

      const result = await this.userRepository.delete(id);

      if (result.affected === 0) {
        throw new ErrorManager({
          type: 'NOT_MODIFIED',
          message: 'Something went wrong, try it later',
        });
      }

      return userFound;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
