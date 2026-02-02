import { IsNotEmpty, IsNumber, IsDateString, Min } from 'class-validator';

export class CreateBookingDto {
  @IsNumber()
  @IsNotEmpty()
  roomId: number;

  @IsDateString()
  @IsNotEmpty()
  checkInDate: string;  // ISO format: "2026-02-10"

  @IsDateString()
  @IsNotEmpty()
  checkOutDate: string;  // ISO format: "2026-02-15"

  @IsNumber()
  @Min(1)
  guestsCount: number;
}