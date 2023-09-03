import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MaxLength,
  IsStrongPassword,
} from 'class-validator/types/decorator/decorators';

export class CreateUserDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  email: string;

  @IsStrongPassword()
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  password: string;
}
