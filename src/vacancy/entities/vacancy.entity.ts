import { BaseEntity } from '../../config/base.entity';
import { IVacancy } from '../interfaces/vacancy.interface';
import { JobStatus } from '../enums/job-status.enum';
import { Column, Entity } from 'typeorm';

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

  // company: CompanyEntity
  // job: JobEntity
  // location: LocationEntity
  // color: ColorEntity
  // networks: NetworkEntity []
}
