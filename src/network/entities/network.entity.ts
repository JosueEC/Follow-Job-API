import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { INetwork } from '../interfaces/network.interface';
import { SocialNetwork } from '../enums/social-network.enum';
import { ProfileEntity } from '../../profile/entities/profile.entity';
import { VacancyEntity } from 'src/vacancy/entities/vacancy.entity';

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
  profile: ProfileEntity;

  @ManyToOne(() => VacancyEntity, (vacancy) => vacancy.networks, {
    onDelete: 'CASCADE',
  })
  vacancy: VacancyEntity;
}
