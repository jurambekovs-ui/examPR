import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { JwtAuthGuard } from '../../common/guard/jwt-auth.guard';
import { RolesGuard } from '../../common/guard/roles.guard';
import { RolesDecorator } from '../../common/decorator/roles.decorator';
import { Roles } from '../../common/enums/roles.enum';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('rooms') // <--- bu dekorator juda muhim!
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  @RolesDecorator(Roles.SUPERADMIN, Roles.ADMIN)
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }

  @Get()
  findAll() {
    return this.roomsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.roomsService.findOneById(id);
  }

  @Patch(':id')
  @RolesDecorator(Roles.SUPERADMIN, Roles.ADMIN)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.update(id, updateRoomDto);
  }

  @Delete(':id')
  @RolesDecorator(Roles.SUPERADMIN, Roles.ADMIN)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.roomsService.delete(id);
  }
}
