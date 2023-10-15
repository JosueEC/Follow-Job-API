import { IsEnum, IsOptional, IsString, IsUUID, IsUrl } from 'class-validator';
import { JobStatus } from '../enums/job-status.enum';
import { IVacancy } from '../interfaces/vacancy.interface';

export class CreateVacancyDto implements IVacancy {
  @IsOptional()
  @IsString()
  @IsUrl()
  postUrl: string;

  @IsOptional()
  @IsString()
  salary: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsEnum(JobStatus)
  status: JobStatus;

  @IsOptional()
  @IsUUID()
  companyId: string;
}
