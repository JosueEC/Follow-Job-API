import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserFiltersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  public async findAllAddProfile(): Promise<User[]> {
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
  }

  public async findAllAddOccupations(): Promise<User[]> {
    return await this.userRepository.find({
      relations: ['occupations'],
      select: {
        occupations: {
          name: true,
          years_experience: true,
          months_experience: true,
        },
      },
    });
  }

  public async findAllAddRelations(): Promise<User[]> {
    return await this.userRepository.find({
      relations: ['profile', 'occupations'],
      select: {
        profile: {
          name: true,
          profession: true,
        },
        occupations: {
          name: true,
          years_experience: true,
          months_experience: true,
        },
      },
    });
  }
}
