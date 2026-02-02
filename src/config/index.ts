import * as dotenv from 'dotenv';
dotenv.config();



export interface TokenConfig {
  ACCESS_KEY: string;
  ACCESS_TIME: string; 
  REFRESH_KEY: string;
  REFRESH_TIME: string;
}

export const config = {
  PORT: Number(process.env.PORT),
  DB_URL: String(process.env.DB_URL),
  TOKEN_KEY: String(process.env.TOKEN_KEY),
  TOKEN_TIME: Number(process.env.TOKEN_TIME), 
  REFRESH_TOKEN_KEY: process.env.REFRESH_TOKEN_KEY || 'refresh_super_secret_1234567890',
  REFRESH_TOKEN_TIME: process.env.REFRESH_TOKEN_TIME || '7d',
  UPLOAD_PATH: String(process.env.UPLOAD_PATH),
  BASE_URL: String(process.env.BASE_URL),
  JWT_SECRET: String(process.env.JWT_SECRET),
  JWT_EXPIRES: String(process.env.JWT_EXPIRES),
  
};
