import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

interface Booking {
  id: number;
  roomId: number;
  userId: number;
  checkInDate: string;
  checkOutDate: string;
  guestsCount: number;
  totalPrice: number;
}

@Injectable()
export class BookingsService {
  private bookings: Booking[] = [
    {
      id: 1,
      roomId: 1,
      userId: 1,
      checkInDate: '2026-02-10',
      checkOutDate: '2026-02-15',
      guestsCount: 2,
      totalPrice: 750,
    },
  ];

  create(createBookingDto: CreateBookingDto, userId: number): Booking {
    const roomPricePerNight = 150;

    const checkIn = new Date(createBookingDto.checkInDate);
    const checkOut = new Date(createBookingDto.checkOutDate);

    const nights = Math.ceil(
      (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (nights <= 0) {
      throw new BadRequestException(
        'Check-out date must be after check-in date',
      );
    }

    const totalPrice = nights * roomPricePerNight;

    const newBooking: Booking = {
      id: this.bookings.length + 1,
      userId,
      ...createBookingDto, // roomId приходит отсюда
      totalPrice,
    };

    this.bookings.push(newBooking);
    return newBooking;
  }

  findAll(): Booking[] {
    return this.bookings;
  }

  findOneById(id: number): Booking {
    const booking = this.bookings.find(b => b.id === id);
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
    return booking;
  }

  update(id: number, updateBookingDto: UpdateBookingDto): Booking {
    const booking = this.findOneById(id);
    Object.assign(booking, updateBookingDto);
    return booking;
  }

  delete(id: number): { message: string } {
    const index = this.bookings.findIndex(b => b.id === id);
    if (index === -1) {
      throw new NotFoundException('Booking not found');
    }
    this.bookings.splice(index, 1);
    return { message: 'Booking deleted successfully' };
  }
}
