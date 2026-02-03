import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../core/entity/user.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Roles } from '../../common/enums/roles.enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async createAdmin(createAdminDto: CreateAdminDto) {
    const existing = await this.userRepo.findOne({ where: { phoneNumber: createAdminDto.phoneNumber } });
    if (existing) throw new BadRequestException('Admin with this phone already exists');

    const hashed = await bcrypt.hash(createAdminDto.password, 10);
    const admin = this.userRepo.create({
      ...createAdminDto,
      password: hashed,
      role: Roles.ADMIN,
    });
    return this.userRepo.save(admin);
  }

  async findAllAdmins() {
    return this.userRepo.find({ where: { role: Roles.ADMIN }, select: ['id', 'phoneNumber', 'fullName', 'email', 'role', 'createdAt'] });
  }
}
