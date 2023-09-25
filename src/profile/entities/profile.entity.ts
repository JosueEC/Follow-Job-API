import { Column, Entity } from 'typeorm';
import { IProfile } from '../interfaces/profile.interface';
import { BaseEntity } from 'src/config/base.entity';

@Entity({ name: 'profile' })
export class ProfileEntity extends BaseEntity implements IProfile {
  @Column({
    name: 'name',
    type: 'varchar',
    length: 300,
  })
  name: string;

  @Column({
    name: 'profession',
    type: 'varchar',
    length: 300,
  })
  profession: string;
}
