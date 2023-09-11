import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { LevelSkill } from '../enums';

@Entity({ name: 'skill' })
export class Skill {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'name', type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ name: 'level', type: 'enum', enum: LevelSkill })
  level: LevelSkill;
}
