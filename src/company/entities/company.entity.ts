import { BaseEntity } from '../../config/base.entity';
import { ICompany } from '../interfaces/company.interface';
import { Column, Entity, OneToMany } from 'typeorm';
import { VacancyEntity } from '../../vacancy/entities/vacancy.entity';

@Entity({ name: 'company' })
export class CompanyEntity extends BaseEntity implements ICompany {
  @Column({
    name: 'name',
    type: 'varchar',
    length: 255,
    unique: true,
  })
  name: string;

  @OneToMany(() => VacancyEntity, (vacancy) => vacancy.company, {
    cascade: true,
  })
  vacancies: VacancyEntity[];
}
