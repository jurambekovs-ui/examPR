// src/api/rooms/rooms.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

export interface Room {
  id: number;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class RoomsService {
  private rooms: Room[] = [];
  private idCounter = 1;

  create(dto: CreateRoomDto): Room {
    const room: Room = {
      id: this.idCounter++,
      name: dto.name,
      description: dto.description,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.rooms.push(room);
    return room;
  }

  findAll(): Room[] {
    return this.rooms;
  }

  findOneById(id: number): Room {
    const room = this.rooms.find(r => r.id === id);
    if (!room) throw new NotFoundException(`Room with id ${id} not found`);
    return room;
  }

  update(id: number, dto: UpdateRoomDto): Room {
    const room = this.findOneById(id);
    room.name = dto.name ?? room.name;
    room.description = dto.description ?? room.description;
    room.updatedAt = new Date();
    return room;
  }

  delete(id: number): { message: string } {
    const index = this.rooms.findIndex(r => r.id === id);
    if (index === -1) throw new NotFoundException(`Room with id ${id} not found`);
    this.rooms.splice(index, 1);
    return { message: 'Room deleted successfully' };
  }
}
