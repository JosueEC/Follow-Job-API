import { Occupation } from 'src/occupation/entities/occupation.entity';
import { Profile } from 'src/profile/entities/profile.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'email', type: 'varchar', length: '200', unique: true })
  email: string;

  @Column({ name: 'password', type: 'varchar', length: '200' })
  password: string;

  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;

  @OneToMany(() => Occupation, (occuapation) => occuapation.professional)
  occupations: Occupation[];
}
