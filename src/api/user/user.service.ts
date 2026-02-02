// src/api/user/user.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/core/entity/user.entity';
import type { UserRepository } from 'src/core/repository/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BaseService } from 'src/infrastructure/utils/BaseService';

@Injectable()
export class UserService extends BaseService<CreateUserDto, UpdateUserDto, User> {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: UserRepository
  ) {
    super(userRepo); 
  }
}
  