import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { CreateVacancyDto } from './create-vacancy.dto';
import { Type } from 'class-transformer';

export class RelatesVacancyDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateVacancyDto)
  vacancy: CreateVacancyDto;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  userId: string;

  @IsOptional()
  @IsString()
  @IsUUID()
  companyId: string;

  @IsOptional()
  @IsString()
  @IsUUID()
  jobId: string;

  @IsOptional()
  @IsString()
  @IsUUID()
  locationId: string;

  @IsOptional()
  @IsString()
  @IsUUID()
  colorId: string;
}
