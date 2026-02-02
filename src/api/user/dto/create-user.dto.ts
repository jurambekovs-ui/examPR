import {
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  IsEmail,
  IsEnum,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  surname: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsStrongPassword()
  @IsNotEmpty()
  password: string;

  @IsPhoneNumber('UZ')
  @IsNotEmpty()
  phoneNumber: string;

  @IsEnum(['guest', 'admin', 'superadmin'])
  @IsOptional()
  role?: 'guest' | 'admin' | 'superadmin'; 
 }