import { BaseEntity } from '../../config/base.entity';
import { IVacancy } from '../interfaces/vacancy.interface';
import { JobStatus } from '../enums/job-status.enum';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';
import { CompanyEntity } from '../../company/entities/company.entity';
import { JobEntity } from '../../job/entities/job.entity';
import { LocationEntity } from '../../location/entities/location.entity';
import { ColorEntity } from '../../color/entities/color.entity';
import { UserEntity } from '../../user/entities/user.entity';

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
  //* NOTA: En algunas relaciones no agrego la propiedad onDelete
  //* ya que deseo conservar los registros de las vacantes aunque
  //* el registro padre sea eliminado
  @ManyToMany(() => UserEntity, (user) => user.vacancies)
  user: UserEntity[];

  @ManyToOne(() => CompanyEntity, (company) => company.vacancies)
  @JoinColumn({
    name: 'company_id',
    referencedColumnName: 'id',
  })
  company: CompanyEntity;

  @ManyToOne(() => JobEntity, (job) => job.vacancies)
  @JoinColumn({
    name: 'job_id',
    referencedColumnName: 'id',
  })
  job: JobEntity;

  @ManyToOne(() => LocationEntity, (location) => location.vacancies)
  @JoinColumn({
    name: 'location_id',
    referencedColumnName: 'id',
  })
  location: LocationEntity;

  @ManyToOne(() => ColorEntity, (color) => color.vacancies)
  @JoinColumn({
    name: 'color_id',
    referencedColumnName: 'id',
  })
  color: ColorEntity;
}
