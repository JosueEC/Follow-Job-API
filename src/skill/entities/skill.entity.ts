import { Column, Entity } from 'typeorm';
import { ISkill } from '../interfaces/skill.interface';
import { OccupationEntity } from 'src/occupation/entities/occupation.entity';
import { BaseEntity } from 'src/config/base.entity';

@Entity({ name: 'skill' })
export class SkillEntity extends BaseEntity implements ISkill {
  @Column({
    name: 'name',
    type: 'varchar',
    length: 255,
    unique: true,
  })
  name: string;

  occupations: OccupationEntity[];
}
