import { LevelSkill } from '../../skill/enums';
import { OccupationEntity } from './occupation.entity';
import { SkillEntity } from '../../skill/entities';
import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';

@Entity({ name: 'occupations_skills' })
export class OccupationsSkillsEntity extends BaseEntity {
  @Column({
    name: 'level',
    type: 'enum',
    enum: LevelSkill,
    default: LevelSkill.BASIC,
  })
  level: LevelSkill;

  @ManyToOne(() => OccupationEntity, (occupation) => occupation.skillsIncludes)
  occupation: OccupationEntity;

  @ManyToOne(() => SkillEntity, (skill) => skill.occupationsIncludes)
  skill: SkillEntity;
}
