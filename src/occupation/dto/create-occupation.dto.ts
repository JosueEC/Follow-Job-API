import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateOccupationDto {
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
  years_experience: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(12)
  @IsOptional()
  months_experience: number;

  @IsUUID()
  @IsString()
  @IsNotEmpty()
  professionalId: string;
}
