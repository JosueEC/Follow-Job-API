import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { OccupationEntity } from '../../occupation/entities/occupation.entity';
import { ProfileEntity } from '../../profile/entities/profile.entity';
import { IUser } from '../interfaces/user.interface';
import { BaseEntity } from '../../config/base.entity';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity implements IUser {
  @Column({
    name: 'email',
    type: 'varchar',
    length: 255,
    unique: true,
  })
  email: string;

  @Column({
    name: 'password',
    type: 'varchar',
    length: 255,
    select: false,
  })
  password: string;

  @OneToOne(() => ProfileEntity)
  @JoinColumn()
  profile: ProfileEntity;

  @OneToMany(() => OccupationEntity, (occuapation) => occuapation.professional)
  occupations: OccupationEntity[];
}
