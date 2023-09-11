import { Occupation } from 'src/occupation/entities/occupation.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'skill' })
export class Skill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', type: 'varchar', length: 255, unique: true })
  name: string;

  // Esta es la segunda parte de la relacion n:n. Basicamente es lo
  // mismo en cada entidad, solo modificando la entidad con la que
  // se establece la relacion del otro lado. Esta relacion lo que hara
  // es crear una tabla intermedia entre ambas entidades, la cual
  // contendra los id's de las relaciones

  // El segundo parametro es para poder realizar consultas de forma
  // bidireccional, por ende acceder a una skill y devolver la
  // lista de ocupaciones a la que esta asociada y viceversa
  @ManyToMany(() => Occupation, (occupation) => occupation.skills)
  occupations: Occupation[];
}
