import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { ProfileEntity } from '../../profile/entities/profile.entity';
import { IUser } from '../interfaces/user.interface';
import { BaseEntity } from '../../config/base.entity';
import { UsersOccupationsEntity } from './users-occupations.entity';
import { VacancyEntity } from '../../vacancy/entities/vacancy.entity';

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

  // Si habilitamos la opcion cascade en true, significa que
  // cuando creemos un usuario y le asignemos la relacion
  // con su profile, no sera necesario que primero guardemos
  // el profile y despues lo asignemos, solo debemos asignar
  // el profile y este automaticamente tambien se guardara
  // en la BD con su relacion.
  // NOTA: El decorador @JoinColum solo debe ser colocado en un
  // lado de la relacion, preferiblemente del lado de la entidad
  // padre, asi mismo, la entidad que contenga este decorador
  // sera la que guarde el id como llave foranea de la entidad
  // con la que establecemos la relacion, en este caso, la tabla
  // user almacenara la columna profile_id la cual establece la
  // conexion OneToOne con profile
  @OneToOne(() => ProfileEntity, (profile) => profile.user, {
    eager: true, // Indica que siempre que se consulte un registro
    // user, el profile siempre ira incluido en la consulta. Esto
    // funciona con userRepository.find() donde no sera necesari
    // establecer la relacion ya que este dato vendra por defecto
    // con query builder no funciona el eager asi que si hay que
    // hacer uso de un leftJoin
    cascade: true, // Indica que podemos guardar la relacion
    // con profile sin necesidad de antes guardar el profile a
    // traves de un .save, solo bastara con el .save de la entidad
    // user
  })
  profile: ProfileEntity;

  @OneToMany(
    () => UsersOccupationsEntity,
    (userOccupation) => userOccupation.user,
    { cascade: true },
  )
  occupationsIncludes: UsersOccupationsEntity[];

  // Esta es la forma basica para establecer una relacion
  // ManyToMany con typeorm. Esta instruccion es recomendable
  // colocarla en la tabla "padre" de la relacion. Esto crea
  // una tabla intermedia que almacena los id's de las
  // entidades que establecen una relacion.
  // Aunque, en este caso la relacion se esta colocando de forma
  // bidireccional, por lo que esta estara declarada en ambas
  // entidades, esto es para volver mas flexibles la relaciones
  // y asi mismo las consultas, asi como poder usar las propiedades
  // de onDelete: 'CASCADE' y cascade: true
  @ManyToMany(() => VacancyEntity, (vacancy) => vacancy.user, {
    cascade: true,
  })
  // Mientras que @JoinColumn es usado en la relacion OneToOne
  // @JoinTable es usado en la relacion ManyToMany y de igual forma nos
  // permite definir de forma explicita los parametros de la relacion
  // en este caso son los parametros de la tabla intermedia que es
  // creada como resultado de una relacion ManyToMany
  @JoinTable({
    name: 'user_vacancies', // Nombre que tendra la tabla intermedia
    joinColumn: {
      // parametros de columna que almacena el dato de
      // referencia de la tabla padre o primer tabla
      name: 'user_id', // nombre que tendra la columna
      referencedColumnName: 'id', // Que dato de la entidad padre o
      // primer tabla sera usado para la referencia
    },
    inverseJoinColumn: {
      // parametros de columna de la segunda tabla o tabla hija
      name: 'vacancy_id', // nombre que tendra la columna
      referencedColumnName: 'id', // dato de la segunda entidad o
      // tabla hija que sera usado para la referencia
    },
    // Basicamente esto definira que la tabla intermedia creada
    // como resultado de esta relacion, tendra la siguiente
    // estructura:
    //  ---------------------------
    //  |    user_vacancies       |
    //  ---------------------------
    //  | user_id   | vacancy_id  |
    //  --------------------------
  })
  vacancies: VacancyEntity[];
}
