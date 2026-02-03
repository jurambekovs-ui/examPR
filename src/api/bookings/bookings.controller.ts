import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import type { Request } from 'express';

import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { JwtAuthGuard } from '../../common/guard/jwt-auth.guard';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createBookingDto: CreateBookingDto,
    @Req() req: Request,
  ): any {
    const user = req.user as { userId: number };
    return this.bookingsService.create(createBookingDto, user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): any {
    return this.bookingsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): any {
    return this.bookingsService.findOneById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBookingDto: UpdateBookingDto,
  ): any {
    return this.bookingsService.update(id, updateBookingDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): any {
    return this.bookingsService.delete(id);
  }
}
