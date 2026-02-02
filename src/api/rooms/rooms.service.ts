import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomsService {
  private rooms = [
    { id: 1, name: 'Deluxe Room', description: 'Luxury room with sea view', pricePerNight: 150, capacity: 2, imageUrl: '/uploads/room1.jpg' },
    { id: 2, name: 'Standard Room', description: 'Comfortable room', pricePerNight: 80, capacity: 2, imageUrl: '/uploads/room2.jpg' },
  ];

  create(createRoomDto: CreateRoomDto) {
    const newRoom = {
      id: this.rooms.length + 1,
      name: createRoomDto.name,
      description: createRoomDto.description ?? '',
      pricePerNight: createRoomDto.pricePerNight,
      capacity: createRoomDto.capacity,
      imageUrl: createRoomDto.imageUrl ?? '',
    };
    this.rooms.push(newRoom);
    return newRoom;
  }

  findAll() {
    return this.rooms;
  }

  findOneById(id: number) {
    const room = this.rooms.find(r => r.id === id);
    if (!room) {
      throw new NotFoundException('Room not found');
    }
    return room;
  }

  update(id: number, updateRoomDto: UpdateRoomDto) {
    const room = this.findOneById(id);
    Object.assign(room, updateRoomDto);
    return room;
  }

  delete(id: number) {
    const index = this.rooms.findIndex(r => r.id === id);
    if (index === -1) {
      throw new NotFoundException('Room not found');
    }
    this.rooms.splice(index, 1);
    return { message: 'Room deleted successfully' };
  }
}