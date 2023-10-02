import { Column, Entity, OneToMany } from 'typeorm';
import { IProfile } from '../interfaces/profile.interface';
import { BaseEntity } from '../../config/base.entity';
import { NetworkEntity } from '../../network/entities/network.entity';

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

  @OneToMany(() => NetworkEntity, (network) => network.profile, {
    cascade: true,
  })
  networks: NetworkEntity[];
}
