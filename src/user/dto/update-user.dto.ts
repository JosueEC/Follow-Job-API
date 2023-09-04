import {
  IsEmail,
  IsString,
  MaxLength,
  IsOptional,
  IsStrongPassword,
  IsNotEmpty,
} from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  @IsOptional()
  email?: string;

  @IsStrongPassword()
  @IsString()
  @MaxLength(200)
  @IsNotEmpty()
  @IsOptional()
  password?: string;
}
