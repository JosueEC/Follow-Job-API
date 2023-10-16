import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateNetworkDto } from '../../network/dto/create-network.dto';

export class RelatesCompanyDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  companyId: string;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateNetworkDto)
  networks: Array<CreateNetworkDto>;
}
