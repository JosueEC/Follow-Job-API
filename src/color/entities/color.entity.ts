import { BaseEntity } from 'src/config/base.entity';
import { IColor } from '../interfaces/color.interface';
import { VacancyEntity } from 'src/vacancy/entities/vacancy.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'color' })
export class ColorEntity extends BaseEntity implements IColor {
  @Column({
    name: 'name',
    type: 'varchar',
    length: 100,
    unique: true,
  })
  name: string;

  @OneToMany(() => VacancyEntity, (vacancy) => vacancy.color, { cascade: true })
  vacancies: VacancyEntity[];
}
