// src/api/auth/auth.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../core/entity/user.entity';
import { CreateUserDto } from '../../api/user/dto/create-user.dto';
import { Roles } from '../../common/enums/roles.enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async register(dto: CreateUserDto) {
    const existing = await this.userRepo.findOne({ where: { phoneNumber: dto.phoneNumber } });
    if (existing) throw new BadRequestException('User already exists');

    const hashed = await bcrypt.hash(dto.password, 10);
    const user = this.userRepo.create({
      ...dto,
      password: hashed,
      role: Roles.USER,
    });

    return this.userRepo.save(user);
  }

  // login metodi
  async login(dto: CreateUserDto) {
    const user = await this.userRepo.findOne({ where: { phoneNumber: dto.phoneNumber } });
    if (!user) throw new BadRequestException('User not found');

    const match = await bcrypt.compare(dto.password, user.password);
    if (!match) throw new BadRequestException('Password incorrect');

    return { message: 'Login success', userId: user.id };
  }
}
