import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateOccupationDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(200)
  name: string;

  @IsInt()
  @IsNumber()
  @IsPositive()
  @MinLength(0)
  @MaxLength(100)
  @IsOptional()
  years_experience: number;

  @IsInt()
  @IsNumber()
  @IsPositive()
  @MinLength(0)
  @MaxLength(12)
  @IsOptional()
  months_experience: number;
}
