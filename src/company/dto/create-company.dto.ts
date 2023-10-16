import { BaseEntity } from 'src/config/base.entity';
import { ICompany } from '../interfaces/company.interface';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCompanyDto extends BaseEntity implements ICompany {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(255)
  name: string;
}
