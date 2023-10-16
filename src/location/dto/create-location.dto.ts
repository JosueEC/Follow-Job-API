import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ILocation } from '../interfaces/location.interface';

export class CreateLocationDto implements ILocation {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  name: string;
}
