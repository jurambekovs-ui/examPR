import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { config } from 'src/config';

@Injectable()
export class TokenService {
  constructor(private readonly jwt: JwtService) {}

  async generateAccessToken(payload: any): Promise<string> {
  return this.jwt.signAsync(payload, {
    secret: config.TOKEN_KEY,
    expiresIn: config.TOKEN_TIME as `${number}${'h'|'m'|'d'|'s'}` | number | undefined,  
  });
}

  async generateRefreshToken(payload: any): Promise<string> {
    return this.jwt.signAsync(payload, {
      secret: config.REFRESH_TOKEN_KEY || config.TOKEN_KEY,
      expiresIn: config.REFRESH_TOKEN_TIME as `${number}${'h'|'m'|'d'|'s'}` | number | undefined || '7d',
    });
  }

  async verifyToken(token: string): Promise<any> {
    try {
      return await this.jwt.verifyAsync(token, { secret: config.TOKEN_KEY });
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }
}