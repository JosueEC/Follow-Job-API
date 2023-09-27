import { Column, Entity, OneToMany } from 'typeorm';
import { ISkill } from '../interfaces/skill.interface';
import { BaseEntity } from '../../config/base.entity';
import { OccupationsSkillsEntity } from '../../occupation/entities/occupations-skills.entity';

@Entity({ name: 'skill' })
export class SkillEntity extends BaseEntity implements ISkill {
  @Column({
    name: 'name',
    type: 'varchar',
    length: 255,
    unique: true,
  })
  name: string;

  @OneToMany(
    () => OccupationsSkillsEntity,
    (occupationsSkills) => occupationsSkills.skill,
  )
  occupationsIncludes: OccupationsSkillsEntity[];
}
