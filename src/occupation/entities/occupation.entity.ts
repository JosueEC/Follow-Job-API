import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'occupation' })
export class Occupation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', type: 'varchar', length: 300 })
  name: string;

  @Column({ name: 'years_experience', type: 'smallint', nullable: true })
  years_experience: number;

  // skills: Skill[]
}
