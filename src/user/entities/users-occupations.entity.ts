import { BaseEntity } from '../../config/base.entity';
import { UserEntity } from './user.entity';
import { OccupationEntity } from '../../occupation/entities/occupation.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

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

  @ManyToOne(() => UserEntity, (user) => user.occupationsIncludes)
  user: UserEntity;

  @ManyToOne(() => OccupationEntity, (occupation) => occupation.usersIncludes)
  occupation: OccupationEntity;
}
