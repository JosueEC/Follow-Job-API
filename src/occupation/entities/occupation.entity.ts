import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'occupation' })
export class Occupation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', type: 'varchar', length: 300, unique: true })
  name: string;

  @Column({ name: 'years_experience', type: 'smallint', nullable: true })
  years_experience: number;

  @Column({ name: 'professionalId', type: 'uuid' })
  professionalId: string;

  @ManyToOne(() => User)
  professional: User;

  // skills: Skill[]
}
