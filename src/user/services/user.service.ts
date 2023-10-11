import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserEntity } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ErrorManager } from '../../utils/error.manager';
import { UsersOccupationsEntity } from '../entities/users-occupations.entity';
import { OccupationsSkillsEntity } from 'src/occupation/entities/occupations-skills.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(UsersOccupationsEntity)
    private readonly usersOccupationsRepository: Repository<UsersOccupationsEntity>,
    @InjectRepository(OccupationsSkillsEntity)
    private readonly occupationsSkillsRepository: Repository<OccupationsSkillsEntity>,
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

  public async findOneBasic(userId: string): Promise<UserEntity> {
    try {
      const user = await this.userRepository
        .createQueryBuilder('user')
        .where('user.id = :userId', { userId })
        .getOne();

      if (!user) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'User not found :(',
        });
      }

      return user;
    } catch (error) {
      console.info(error);
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findOne(id: string): Promise<UserEntity> {
    //* NOTA: Para conectarnos a alguna otra tabla a traves de query builder
    //* podemos usar leftJoinAndSelect, el cual se conectara y por defecto
    //* devolvera todos los campos del registro en la tabla conectada. Asi
    //* mismo podemos usar la combinacion de leftJoin y addSelect para de
    //* igual forma conectarnos a la tabla para devolver solo columnas
    //* especificas del registro
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
        // Para conectarnos a una relacion OneToOne basta con un leftJoinAndSelect
        // accediendo a la propiedad de conexion y asignando un alias
        .leftJoin('user.profile', 'profile')
        .addSelect(['profile.id', 'profile.name', 'profile.profession'])
        .leftJoin('profile.networks', 'networks')
        .addSelect(['networks.id', 'networks.name', 'networks.url'])
        // Para conectarse a une relacion ManyToMany a traves de una tabla
        // intermedia es necesario usar 2 leftJoinAndSelect, el primero conecta
        // con la tabla intermedia y devuelve sus datos y el segundo realiza la
        // segunda conexion con la otra tabla que esta conectada a traves de la
        // tabla intermedia y asi accedemos a los datos gracias a la conexion
        // Igualmente debemos asignar alias a estas consultas
        .leftJoin('user.occupationsIncludes', 'occupationsIncludes')
        .addSelect([
          'occupationsIncludes.id',
          'occupationsIncludes.yearsExperience',
          'occupationsIncludes.monthsExperience',
        ])
        .leftJoin('occupationsIncludes.occupation', 'occupation')
        .addSelect(['occupation.id', 'occupation.name'])
        .leftJoin('occupation.skillsIncludes', 'skillsIncludes')
        .addSelect(['skillsIncludes.id', 'skillsIncludes.level'])
        .leftJoin('skillsIncludes.skill', 'skill')
        .addSelect(['skill.id', 'skill.name'])
        .leftJoin('user.vacancies', 'vacancies')
        .addSelect([
          'vacancies.id',
          'vacancies.postUrl',
          'vacancies.salary',
          'vacancies.description',
          'vacancies.status',
        ])
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

  public async deleteOne(userId: string): Promise<DeleteResult> {
    // Esta funcion elimina un registro que tiene multiples relaciones con
    // otras tablas
    try {
      // Primero verificamos que el usuario que se intenta eliminar
      // realmente exista
      const user = await this.userRepository
        .createQueryBuilder('user')
        .where('user.id = :userId', { userId })
        .getOne();

      if (!user) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'User not found : (',
        });
      }

      // Primero eliminamos la relacion entre user y occupation. Solo
      // eliminamos la relacion ya que deseamos conservar el registro
      // de la occupation
      const occupationRelation = await this.usersOccupationsRepository
        .createQueryBuilder('users_occupations')
        .where('users_occupations.user_id = :userId', { userId: user.id })
        .getOne();

      this.usersOccupationsRepository
        .delete(occupationRelation.id)
        .then((deleteRelationResult) => {
          if (deleteRelationResult.affected === 0) {
            throw new ErrorManager({
              type: 'NOT_MODIFIED',
              message:
                'Something went wrong when I try to delete the relation between user and occupation',
            });
          }
        })
        .catch((error) => {
          throw error;
        });

      // TODO: Probar el funcionamiento de esta seccion, aun no elimina las relaciones con occupation y skill
      const skillsRows = await this.occupationsSkillsRepository
        .createQueryBuilder('occupations_skills')
        .where('occupations_skills.occupation_id = :occupationId', {
          occupationId: occupationRelation.occupation.id,
        })
        .addSelect(['id'])
        .getMany();

      this.occupationsSkillsRepository
        .createQueryBuilder('occupations_skills')
        .delete()
        .from(OccupationsSkillsEntity)
        .where('occupations_skills.id IN (:...ids)', { ids: skillsRows })
        .execute()
        .then((deleteResult) => {
          if (deleteResult.affected === 0) {
            throw new ErrorManager({
              type: 'NOT_MODIFIED',
              message:
                'Something went wrong when I try to delete the relations between Occupation and Skill',
            });
          }
        })
        .catch((error) => {
          throw error;
        });

      const result = await this.userRepository.delete(userId);

      if (result.affected === 0) {
        throw new ErrorManager({
          type: 'NOT_MODIFIED',
          message: 'Something went wrong when I try to delete the user',
        });
      }

      return result;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
