import {
  IsNotEmpty,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import { INetwork } from '../interfaces/network.interface';

export class CreateNetworkDto implements INetwork {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  url: string;
}
