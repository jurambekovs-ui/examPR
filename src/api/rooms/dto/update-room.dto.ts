import { IsNumber, IsString, IsOptional, Min } from 'class-validator';

export class UpdateRoomDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @Min(1)
  @IsOptional()
  pricePerNight?: number;

  @IsNumber()
  @Min(1)
  @IsOptional()
  capacity?: number;

  @IsString()
  @IsOptional()
  imageUrl?: string;
}