import { Skill } from 'src/skill/entities';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'occupation' })
export class Occupation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', type: 'varchar', length: 300, unique: true })
  name: string;

  @Column({
    name: 'years_experience',
    type: 'smallint',
    nullable: true,
    default: 0,
  })
  years_experience: number;

  @Column({
    name: 'months_experience',
    type: 'smallint',
    nullable: true,
    default: 0,
  })
  months_experience: number;

  @Column({ name: 'professionalId', type: 'uuid' })
  professionalId: string;

  @ManyToOne(() => User)
  professional: User;

  //* @ManyToMany()
  //    De esta forma se establece una relacion n:n, es importante
  //    que el tipo de dato de la propiedad sea un array de objetos
  //    de la entidad de la relacion
  //* @JoinTable()
  //    Este decorador nos permite definir las propiedades de la tabla
  //    intermedia que se crea de la relacion ManyToMany
  @ManyToMany(() => Skill, (skill) => skill.occupations)
  @JoinTable({
    name: 'occupation_skill', // Nombre de la tabla
    joinColumn: { name: 'occupation_id' }, // nombre de la columna que almacena el id de la primer tabla
    inverseJoinColumn: { name: 'skill_id' }, // nombre de la columna que almacena el id de la segunda tabla
  })
  skills: Skill[];
}
