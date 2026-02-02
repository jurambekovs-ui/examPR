import {
  IsOptional,
  IsString,
  IsPhoneNumber,
  IsEmail,
  IsEnum,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  surname?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @MinLength(6)
  @IsOptional()
  password?: string;

  @IsPhoneNumber('UZ')
  @IsOptional()
  phoneNumber?: string;

  @IsEnum(['guest', 'admin', 'superadmin'])
  @IsOptional()
  role?: 'guest' | 'admin' | 'superadmin';
}