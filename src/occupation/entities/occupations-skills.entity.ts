import { LevelSkill } from 'src/skill/enums';
import { OccupationEntity } from './occupation.entity';
import { SkillEntity } from 'src/skill/entities';
import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/config/base.entity';

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
