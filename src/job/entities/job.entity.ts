import { BaseEntity } from 'src/config/base.entity';
import { IJob } from '../interfaces/job.interface';
import { Column, Entity, OneToMany } from 'typeorm';
import { VacancyEntity } from 'src/vacancy/entities/vacancy.entity';

@Entity({ name: 'job' })
export class JobEntity extends BaseEntity implements IJob {
  @Column({
    name: 'name',
    type: 'varchar',
    length: 500,
  })
  name: string;

  @OneToMany(() => VacancyEntity, (vacancy) => vacancy.job, { cascade: true })
  vacancies: VacancyEntity[];
}
