import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { INetwork } from '../interfaces/network.interface';
import { SocialNetwork } from '../enums/social-network.enum';
import { ProfileEntity } from '../../profile/entities/profile.entity';
import { CompanyEntity } from '../../company/entities/company.entity';

@Entity({ name: 'network' })
export class NetworkEntity extends BaseEntity implements INetwork {
  @Column({
    name: 'name',
    type: 'enum',
    enum: SocialNetwork,
  })
  name: SocialNetwork;

  @Column({
    name: 'url',
    type: 'varchar',
  })
  url: string;

  @ManyToOne(() => ProfileEntity, (profile) => profile.networks, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'profile_id',
    referencedColumnName: 'id',
  })
  profile: ProfileEntity;

  @ManyToOne(() => CompanyEntity, (company) => company.networks, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'company_id',
    referencedColumnName: 'id',
  })
  company: CompanyEntity;
}
