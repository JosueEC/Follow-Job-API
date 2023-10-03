import { BaseEntity } from '../../config/base.entity';
import { IVacancy } from '../interfaces/vacancy.interface';
import { JobStatus } from '../enums/job-status.enum';
import { Column, Entity, ManyToOne } from 'typeorm';
import { CompanyEntity } from 'src/company/entities/company.entity';
import { JobEntity } from 'src/job/entities/job.entity';
import { LocationEntity } from 'src/location/entities/location.entity';

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
  // color: ColorEntity
  // networks: NetworkEntity []
}
