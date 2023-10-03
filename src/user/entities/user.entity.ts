import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { ProfileEntity } from '../../profile/entities/profile.entity';
import { IUser } from '../interfaces/user.interface';
import { BaseEntity } from '../../config/base.entity';
import { UsersOccupationsEntity } from './users-occupations.entity';
import { VacancyEntity } from '../../vacancy/entities/vacancy.entity';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity implements IUser {
  @Column({
    name: 'email',
    type: 'varchar',
    length: 255,
    unique: true,
  })
  email: string;

  @Column({
    name: 'password',
    type: 'varchar',
    length: 255,
    select: false,
  })
  password: string;

  // Si habilitamos la opcion cascade en tru, significa que
  // cuando creemos un usuario y le asignemos la relacion
  // con su profile, no sera necesario que primero guardemos
  // el profile y despues lo asignemos, solo debemos asignar
  // el profile y este automaticamente tambien se guardara
  // en la BD con su relacion
  @OneToOne(() => ProfileEntity, { cascade: true })
  @JoinColumn()
  profile: ProfileEntity;

  @OneToMany(
    () => UsersOccupationsEntity,
    (userOccupation) => userOccupation.user,
  )
  occupationsIncludes: UsersOccupationsEntity[];

  // Esta es la forma basica para establecer una relacion
  // ManyToMany con typeorm. Esta instruccion es recomendable
  // colocarla en la tabla "padre" de la relacion. Esto crea
  // una tabla intermedia que almacena los id's de las
  // entidades que establecen una relacion
  @ManyToMany(() => VacancyEntity)
  @JoinTable()
  vacancies: VacancyEntity[];
}
