import { LevelSkill } from '../../skill/enums';
import { OccupationEntity } from './occupation.entity';
import { SkillEntity } from '../../skill/entities';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
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

  //* NOTA: Para el caso de skill y occupation no agregamos la propiedad
  //* onDelete, dado que deseamos conservar los datos de las skills y
  //* las ocupaciones aunque las relaciones entre ellas sean eliminadas
  @ManyToOne(() => OccupationEntity, (occupation) => occupation.skillsIncludes)
  @JoinColumn({
    name: 'occupation_id',
    referencedColumnName: 'id',
  })
  occupation: OccupationEntity;

  @ManyToOne(() => SkillEntity, (skill) => skill.occupationsIncludes)
  @JoinColumn({
    name: 'skill_id',
    referencedColumnName: 'id',
  })
  skill: SkillEntity;
}
