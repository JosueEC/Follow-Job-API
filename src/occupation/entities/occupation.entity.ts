import { Column, Entity, OneToMany } from 'typeorm';
import { IOccupation } from '../interfaces/occupation.interface';
import { BaseEntity } from '../../config/base.entity';
import { OccupationsSkillsEntity } from './occupations-skills.entity';
import { UsersOccupationsEntity } from '../../user/entities/users-occupations.entity';

@Entity({ name: 'occupation' })
export class OccupationEntity extends BaseEntity implements IOccupation {
  @Column({
    name: 'name',
    type: 'varchar',
    length: 300,
    unique: true,
  })
  name: string;

  @OneToMany(
    () => OccupationsSkillsEntity,
    (occupationsSkill) => occupationsSkill.occupation,
  )
  skillsIncludes: OccupationsSkillsEntity[];

  @OneToMany(
    () => UsersOccupationsEntity,
    (userOccupation) => userOccupation.occupation,
  )
  usersIncludes: UsersOccupationsEntity[];
}
