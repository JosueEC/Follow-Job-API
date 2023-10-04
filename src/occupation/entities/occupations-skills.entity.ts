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

  // Para el caso de skill y occupation, no agregamos la opcion onDelete, esto es
  // porque deseamos conservar las skills y occupations aunque se borre la ocupacion
  // esto porque las skills creadas nos sirven para las demas ocupaiones
  @ManyToOne(() => SkillEntity, (skill) => skill.occupationsIncludes)
  skill: SkillEntity;
}
