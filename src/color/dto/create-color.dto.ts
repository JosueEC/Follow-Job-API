import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { IColor } from '../interfaces/color.interface';

export class CreateColorDto implements IColor {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  name: string;
}
