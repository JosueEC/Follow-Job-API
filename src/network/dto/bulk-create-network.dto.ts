import {
  IsArray,
  IsNotEmpty,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateNetworkDto } from './create-network.dto';

export class BulkCreateNetworkDto {
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateNetworkDto)
  networks: Array<CreateNetworkDto>;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  profileId: string;
}
