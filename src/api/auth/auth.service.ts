import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../../core/entity/user.entity';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { TokenService } from 'src/infrastructure/token/Token';  

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private tokenService: TokenService,  
  ) {}

  async register(dto: CreateAuthDto) {
    const { phoneNumber, password, fullName } = dto;

    const exists = await this.userRepository.findOne({ where: { phoneNumber } });
    if (exists) {
      throw new BadRequestException('Phone number already registered');
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      phoneNumber,
      password: hashed,
      fullName,
    });

    await this.userRepository.save(user);

    // TokenService dan foydalanamiz
    const token = await this.tokenService.generateAccessToken({
      sub: user.id,
      phoneNumber: user.phoneNumber,
    });

    return {
      message: 'Registered successfully',
      token,
    };
  }

  async login(dto: { phoneNumber: string; password: string }) {
    const user = await this.userRepository.findOne({ where: { phoneNumber: dto.phoneNumber } });
    if (!user) {
      throw new BadRequestException('Invalid phone number or password');
    }

    const match = await bcrypt.compare(dto.password, user.password);
    if (!match) {
      throw new BadRequestException('Invalid phone number or password');
    }

    // TokenService dan foydalanamiz
    const token = await this.tokenService.generateAccessToken({
      sub: user.id,
      phoneNumber: user.phoneNumber,
    });

    return {
      message: 'Login successful',
      token,
    };
  }

  async create(dto: CreateAuthDto) {
    return this.register(dto);
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findOneById(id: number) {
    if (isNaN(id) || id <= 0) {
      throw new BadRequestException('Invalid ID');
    }

    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: number, dto: UpdateAuthDto) {
    if (isNaN(id) || id <= 0) {
      throw new BadRequestException('Invalid ID');
    }

    const user = await this.findOneById(id);
    Object.assign(user, dto);
    await this.userRepository.save(user);
    return user;
  }

  async delete(id: number) {
    if (isNaN(id) || id <= 0) {
      throw new BadRequestException('Invalid ID');
    }

    await this.findOneById(id);
    await this.userRepository.delete(id);
    return { message: 'User deleted successfully' };
  }
}