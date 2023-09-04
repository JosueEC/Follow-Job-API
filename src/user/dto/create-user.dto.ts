import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MaxLength,
  IsStrongPassword,
} from 'class-validator';
import { IsEmailNotRegistered } from './custom-validators/is-email-not-registered';

export class CreateUserDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  @IsEmailNotRegistered({ message: 'The email already exists bro' })
  email: string;

  @IsStrongPassword()
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  password: string;
}
