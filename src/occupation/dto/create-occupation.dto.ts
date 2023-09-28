import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { IOccupation } from '../interfaces/occupation.interface';

export class CreateOccupationDto implements IOccupation {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(200)
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(100)
  @IsOptional()
  yearsExperience: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(12)
  @IsOptional()
  monthsExperience: number;
}
