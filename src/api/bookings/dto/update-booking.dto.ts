import { IsOptional, IsDateString, IsNumber, Min } from 'class-validator';

export class UpdateBookingDto {
  @IsDateString()
  @IsOptional()
  checkInDate?: string;

  @IsDateString()
  @IsOptional()
  checkOutDate?: string;

  @IsNumber()
  @Min(1)
  @IsOptional()
  guestsCount?: number;
}
