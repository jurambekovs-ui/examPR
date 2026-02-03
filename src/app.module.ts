import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './api/auth/auth.module';
import { RoomsModule } from './api/rooms/rooms.module';
import { BookingsModule } from './api/bookings/booking.module';

import { config } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      url: config.DB_URL,
      autoLoadEntities: true,
      entities: ['dist/core/entity/*.entity{.ts,.js}'],
      logging: ['query', 'error', 'schema'],
      synchronize: true,
    }),

    AuthModule,
    RoomsModule,
    BookingsModule,
  ],
})
export class AppModule {}
