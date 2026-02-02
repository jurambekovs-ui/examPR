import { IsOptional, IsString, MinLength, IsPhoneNumber } from 'class-validator';

export class UpdateAuthDto {
  @IsString()
  @IsOptional()
  fullName?: string;

  @IsString()
  @MinLength(6)
  @IsOptional()
  password?: string;

  @IsPhoneNumber('UZ')
  @IsOptional()
  phoneNumber?: string;
}