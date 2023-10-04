import { BaseEntity } from '../../config/base.entity';
import { UserEntity } from './user.entity';
import { OccupationEntity } from '../../occupation/entities/occupation.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'users_occupations' })
export class UsersOccupationsEntity extends BaseEntity {
  @Column({
    name: 'years_experience',
    type: 'smallint',
    nullable: true,
    default: 0,
  })
  yearsExperience: number;

  @Column({
    name: 'months_experience',
    type: 'smallint',
    nullable: true,
    default: 0,
  })
  monthsExperience: number;

  //* NOTA: Aqui tenemos una relacion ManyToMany pero que usa una
  //* tabla intermedia, la cual contiene columnas extra a las basicas
  //* que se crean de forma predeterminada. Aqui la logica de la
  //* propiedad onDelete no se usa, dado que queremos conservar
  //* el dato de la occupation, por ende al borrar el user
  //* se deberia solo borrar el registro de la relacion con occupation
  //* que contien esta tabla, asi no se pierde el registro de la
  //* occupation
  @ManyToOne(() => UserEntity, (user) => user.occupationsIncludes)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user: UserEntity;

  @ManyToOne(() => OccupationEntity, (occupation) => occupation.usersIncludes)
  @JoinColumn({
    name: 'occupation_id',
    referencedColumnName: 'id',
  })
  occupation: OccupationEntity;
}
