import { IsNotEmpty, IsNumber, IsString, IsOptional, Min } from 'class-validator';

export class CreateRoomDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @Min(1)
  pricePerNight: number;

  @IsNumber()
  @Min(1)
  capacity: number;

  @IsString()
  @IsOptional()
  imageUrl?: string;
}