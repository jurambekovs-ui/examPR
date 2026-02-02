import { IsNotEmpty, IsPhoneNumber, IsString, MinLength, IsOptional } from 'class-validator';

export class CreateAuthDto {
  @IsPhoneNumber('UZ')
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  fullName?: string;
}