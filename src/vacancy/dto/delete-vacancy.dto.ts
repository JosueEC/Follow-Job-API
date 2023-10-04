import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class DeleteVacancyDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  vacancyId: string;
}
