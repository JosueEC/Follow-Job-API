import { UserEntity } from '../../user/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { IOccupation } from '../interfaces/occupation.interface';
import { BaseEntity } from 'src/config/base.entity';
import { OccupationsSkillsEntity } from './occupations-skills.entity';

@Entity({ name: 'occupation' })
export class OccupationEntity extends BaseEntity implements IOccupation {
  @Column({
    name: 'name',
    type: 'varchar',
    length: 300,
    unique: true,
  })
  name: string;

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

  @Column({
    name: 'professionalId',
    type: 'uuid',
  })
  professionalId: string;

  @ManyToOne(() => UserEntity)
  professional: UserEntity;

  //* @ManyToMany()
  //    De esta forma se establece una relacion n:n, es importante
  //    que el tipo de dato de la propiedad sea un array de objetos
  //    de la entidad de la relacion
  //* @JoinTable()
  //    Este decorador nos permite definir las propiedades de la tabla
  //    intermedia que se crea de la relacion ManyToMany
  // @ManyToMany(() => SkillEntity, (skill) => skill.occupations)
  // @JoinTable({
  //   name: 'occupation_skill', // Nombre de la tabla
  //   joinColumn: { name: 'occupation_id' }, // nombre de la columna que almacena el id de la primer tabla
  //   inverseJoinColumn: { name: 'skill_id' }, // nombre de la columna que almacena el id de la segunda tabla
  // })
  @OneToMany(
    () => OccupationsSkillsEntity,
    (occupationsSkill) => occupationsSkill.occupation,
  )
  skillsIncludes: OccupationsSkillsEntity[];
}
