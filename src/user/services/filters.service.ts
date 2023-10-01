import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { ErrorManager } from '../../utils/error.manager';

@Injectable()
export class UserFiltersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async findAllAddProfile(): Promise<UserEntity[]> {
    try {
      return await this.userRepository.find({
        //* select: ['email'],
        // De esta forma se pueden establecer que campos se
        // quieren obtener en la consulta
        //* where: {
        //*   accountBill: Like(`${accountBill}%`),
        //*   user: Not(`${user.id}`)
        //* },
        // De igual forma, podemos usar varios filtros dentro de la
        // opcion where para filtrar aun mas nuestra busqueda
        relations: ['profile'],
        // Con relations es como establecemos la conexion con las tablas
        // con las cuales tenemos relacion
        select: {
          profile: {
            name: true,
            profession: true,
          },
        },
        // Tambien, a traves de un select, podemos acceder a la propiedad
        // de la relacion y especificar que campos de la relacion queremos
        // que sean devueltos
      });
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findAllAddOccupations(): Promise<UserEntity[]> {
    try {
      return await this.userRepository.find({
        relations: ['occupationsIncludes'],
        select: {
          occupationsIncludes: {
            occupation: {
              name: true,
            },
            monthsExperience: true,
            yearsExperience: true,
          },
        },
      });
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  // public async findAllAddRelations(): Promise<UserEntity[]> {
  //   try {
  //     return await this.userRepository.find({
  //       relations: ['profile', 'occupations'],
  //       select: {
  //         profile: {
  //           name: true,
  //           profession: true,
  //         },
  //         occupations: {
  //           name: true,
  //           yearsExperience: true,
  //           monthsExperience: true,
  //         },
  //       },
  //     });
  //   } catch (error) {
  //     throw ErrorManager.createSignatureError(error.message);
  //   }
  // }
}
