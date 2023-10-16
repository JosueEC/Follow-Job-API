import { IsEnum, IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { INetwork } from '../interfaces/network.interface';
import { SocialNetwork } from '../enums/social-network.enum';

export class CreateNetworkDto implements INetwork {
  @IsNotEmpty()
  @IsEnum(SocialNetwork)
  name: SocialNetwork;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  url: string;
}
