import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'skill' })
export class Skill {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'name', type: 'varchar', length: 255, unique: true })
  name: string;
}
