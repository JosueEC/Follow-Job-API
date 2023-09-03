import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'email', type: 'varchar', length: '200' })
  email: string;

  @Column({ name: 'password', type: 'varchar', length: '200' })
  password: string;

  profile: string;
}
