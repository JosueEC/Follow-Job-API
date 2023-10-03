import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../config/base.entity';
import { ILocation } from '../interfaces/location.interface';
import { VacancyEntity } from '../../vacancy/entities/vacancy.entity';

@Entity({ name: 'location' })
export class LocationEntity extends BaseEntity implements ILocation {
  @Column({
    name: 'name',
    type: 'varchar',
    length: 500,
    unique: true,
  })
  name: string;

  @OneToMany(() => VacancyEntity, (vacancy) => vacancy.location, {
    cascade: true,
  })
  vacancies: VacancyEntity[];
}
