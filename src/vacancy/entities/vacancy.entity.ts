import { BaseEntity } from '../../config/base.entity';
import { IVacancy } from '../interfaces/vacancy.interface';
import { JobStatus } from '../enums/job-status.enum';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { CompanyEntity } from '../../company/entities/company.entity';
import { JobEntity } from '../../job/entities/job.entity';
import { LocationEntity } from '../../location/entities/location.entity';
import { ColorEntity } from '../../color/entities/color.entity';
import { NetworkEntity } from '../../network/entities/network.entity';
import { UserEntity } from 'src/user/entities/user.entity';

@Entity({ name: 'vacancy' })
export class VacancyEntity extends BaseEntity implements IVacancy {
  @Column({
    name: 'postUrl',
    type: 'varchar',
  })
  postUrl: string;

  @Column({
    name: 'salary',
    type: 'varchar',
    length: 255,
  })
  salary: string;

  @Column({
    name: 'jobDescription',
    type: 'varchar',
    length: 2000,
  })
  description: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: JobStatus,
  })
  status: JobStatus = JobStatus.PENDING;

  // Esta declaracion de la relacion es opcional, ya que fue
  // necesaria para establecer una relacion bi-direccional entre
  // los usuarios y las vacantes, si no se quiere que sea
  // bi-direccional solo se borra y se deja la relacion en una
  // sola entidad
  // NOTA: No agrego la propiedad onDelete: 'CASCADE' dado que
  // quiero conservar las vacantes aun cuando el usuario sea
  // eliminado
  @ManyToMany(() => UserEntity, (user) => user.vacancies)
  user: UserEntity[];

  @ManyToOne(() => CompanyEntity, (company) => company.vacancies, {
    onDelete: 'CASCADE',
  })
  company: CompanyEntity;

  @ManyToOne(() => JobEntity, (job) => job.vacancies, {
    onDelete: 'CASCADE',
  })
  job: JobEntity;

  @ManyToOne(() => LocationEntity, (location) => location.vacancies, {
    onDelete: 'CASCADE',
  })
  location: LocationEntity;

  @ManyToOne(() => ColorEntity, (color) => color.vacancies, {
    onDelete: 'CASCADE',
  })
  color: ColorEntity;

  @OneToMany(() => NetworkEntity, (network) => network.vacancy, {
    cascade: true,
  })
  networks: NetworkEntity[];
}
