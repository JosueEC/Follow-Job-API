import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MaxLength,
  IsStrongPassword,
} from 'class-validator';
import { IUser } from '../interfaces/user.interface';
import { IsEmailNotRegistered } from '../decorators/is-email-not-registered';

export class CreateUserDto implements IUser {
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
