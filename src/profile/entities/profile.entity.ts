import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { IProfile } from '../interfaces/profile.interface';
import { BaseEntity } from '../../config/base.entity';
import { NetworkEntity } from '../../network/entities/network.entity';
import { UserEntity } from '../../user/entities/user.entity';

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

  // De esta forma podemos establecer una relacion bi-direccional
  // entre las entidades, esto nos permite acceder al profile desde
  // la entidad user, asi como acceder al user desde la entidad
  // profile, y de igual forma nos permite usar la propiedad
  // onDelete en cascada para eliminar el profile cuando el registro
  // user asociado sea eliminado
  @OneToOne(() => UserEntity, (user) => user.profile, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    // Crea la columna que almacenara el id que hace referencia a la entidad
    // con la que se tiene la relacion
    name: 'user_id', // Podemos definir el nombre de esta columna si asi
    // lo deseamos
    referencedColumnName: 'id', // De igual forma podemos definir cual es el
    // dato que se usara para la referencia, por defecto se usa el id, pero
    // podemos referenciar el que nosotros querramos, como el name o cualquier
    // propiedad de la entidad relacionada
  })
  user: UserEntity;

  @OneToMany(() => NetworkEntity, (network) => network.profile, {
    cascade: true,
  })
  networks: NetworkEntity[];
}
