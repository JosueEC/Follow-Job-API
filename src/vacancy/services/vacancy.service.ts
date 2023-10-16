import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
import { VacancyEntity } from '../entities/vacancy.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { ErrorManager } from '../../utils/error.manager';
import { UserService } from '../../user/services/user.service';
import { UserFiltersService } from '../../user/services/filters.service';
import { CreateVacancyDto } from '../dto/create-vacancy.dto';
import { DeleteVacancyDto } from '../dto/delete-vacancy.dto';
import { RelatesVacancyDto } from '../dto/relates-vacancy.dto';
import { CompanyService } from 'src/company/services/company.service';
import { JobService } from 'src/job/services/job.service';
import { LocationService } from 'src/location/services/location.service';
import { ColorSerivce } from 'src/color/services/color.service';

@Injectable()
export class VacancyService {
  constructor(
    @InjectRepository(VacancyEntity)
    private readonly vacancyRepository: Repository<VacancyEntity>,
    private readonly userService: UserService,
    private readonly userFiltersService: UserFiltersService,
    private readonly companyService: CompanyService,
    private readonly jobService: JobService,
    private readonly locationService: LocationService,
    private readonly colorService: ColorSerivce,
  ) {}

  public async insertOne(body: CreateVacancyDto): Promise<InsertResult> {
    try {
      return await this.vacancyRepository.insert(body);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findOne(id: string): Promise<VacancyEntity> {
    try {
      const vacancy = await this.vacancyRepository
        .createQueryBuilder('vacancy')
        .where('vacancy.id = :vacancyId', { vacancyId: id })
        .getOne();

      if (!vacancy) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Vacancy not found',
        });
      }

      return vacancy;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findOneWithRelations(vacancyId: string): Promise<VacancyEntity> {
    try {
      const vacancy = await this.vacancyRepository
        .createQueryBuilder('vacancy')
        .leftJoin('vacancy.company', 'company')
        .addSelect(['company.name'])
        .leftJoin('vacancy.job', 'job')
        .addSelect(['job.name'])
        .leftJoin('vacancy.location', 'location')
        .addSelect(['location.name'])
        .leftJoin('vacancy.color', 'color')
        .addSelect(['color.name'])
        .where('vacancy.id = :vacancyId', { vacancyId })
        .getOne();

      if (!vacancy) {
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'Vacancy not found',
        });
      }

      return vacancy;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async relatesVacancy(body: RelatesVacancyDto): Promise<VacancyEntity> {
    try {
      const vacancy = await this.vacancyRepository.save(body.vacancy);
      const user = await this.userFiltersService.findOneAddVacancies(
        body.userId,
      );
      const company = await this.companyService.findOne(body.companyId);
      const job = await this.jobService.findOne(body.jobId);
      const location = await this.locationService.findOne(body.locationId);
      const color = await this.colorService.findOne(body.colorId);

      vacancy.company = company;
      vacancy.job = job;
      vacancy.location = location;
      vacancy.color = color;

      const newVacancy = await this.vacancyRepository.save(vacancy);
      user.vacancies.push(newVacancy);
      await this.userService.save(user);

      return newVacancy;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async deleteOne({
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
