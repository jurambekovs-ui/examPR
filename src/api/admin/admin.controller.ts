import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { JwtAuthGuard } from '../../common/guard/jwt-auth.guard';
import { RolesGuard } from '../../common/guard/roles.guard';
import { RolesDecorator } from '../../common/decorator/roles.decorator';
import { Roles } from '../../common/enums/roles.enum';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @RolesDecorator(Roles.SUPERADMIN)
  createAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.createAdmin(createAdminDto);
  }

  @Get()
  @RolesDecorator(Roles.SUPERADMIN)
  getAllAdmins() {
    return this.adminService.findAllAdmins();
  }
}
