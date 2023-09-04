import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'profile' })
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', type: 'varchar', length: 300 })
  name: string;

  @Column({ name: 'profession', type: 'varchar', length: 300 })
  profession: string;
  // occupation: Occupation;
  // networks: Netkworks;
}
