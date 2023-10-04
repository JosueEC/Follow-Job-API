import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VacancyEntity } from '../entities/vacancy.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { ErrorManager } from '../../utils/error.manager';
import { UserService } from '../../user/services/user.service';
import { UserFiltersService } from '../../user/services/filters.service';
import { CreateVacancyDto } from '../dto/create-vacancy.dto';
import { DeleteVacancyDto } from '../dto/delete-vacancy.dto';

@Injectable()
export class VacancyService {
  constructor(
    @InjectRepository(VacancyEntity)
    private readonly vacancyRepository: Repository<VacancyEntity>,
    private readonly userService: UserService,
    private readonly userFiltersService: UserFiltersService,
  ) {}

  public async create(
    userId: string,
    body: CreateVacancyDto,
  ): Promise<VacancyEntity> {
    try {
      const user = await this.userService.findOneBasic(userId);

      if (!user) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'User not found :(',
        });
      }

      const newVacancy = this.vacancyRepository.create(body);
      user.vacancies = [newVacancy];

      await this.userService.save(user);

      return newVacancy;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async delete({
    userId,
    vacancyId,
  }: DeleteVacancyDto): Promise<UserEntity> {
    try {
      const user = await this.userFiltersService.findOneAddVacancies(userId);

      if (!user) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'User not found :(',
        });
      }

      const vacancy = await this.vacancyRepository
        .createQueryBuilder('vacancy')
        .where('vacancy.id = :vacancyId', { vacancyId })
        .getOne();

      if (!vacancy) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Vacancy not found :(',
        });
      }

      // TODO: Eliminar la vacante de forma manueal
      user.vacancies = [...user.vacancies].filter((vacancy) => {
        return vacancy.id !== vacancyId;
      });

      await this.userService.save(user);
      return await this.userFiltersService.findOneAddVacancies(userId);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
