import { BaseEntity } from '../../config/base.entity';
import { ICompany } from '../interfaces/company.interface';
import { Column, Entity, OneToMany } from 'typeorm';
import { VacancyEntity } from '../../vacancy/entities/vacancy.entity';
import { NetworkEntity } from '../../network/entities/network.entity';

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

  @OneToMany(() => NetworkEntity, (network) => network.company, {
    cascade: true,
    eager: true,
  })
  networks: NetworkEntity[];
}
