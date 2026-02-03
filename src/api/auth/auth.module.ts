import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from '../../core/entity/user.entity';
import { TokenService } from '../../infrastructure/token/Token';  
import { config } from '../../config';
import { JwtStrategy } from './strategy/jwt.strategy';


@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: config.TOKEN_KEY,
      signOptions: { expiresIn: config.TOKEN_TIME as `${number}${'h'|'m'|'d'|'s'}` | number | undefined, },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, TokenService, JwtStrategy],  
})
export class AuthModule {}