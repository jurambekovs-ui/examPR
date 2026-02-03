// src/app.service.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { config } from './config';

export class App {
  static async main() {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('/api');

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    );

    const PORT = config.PORT || 2000;
    await app.listen(PORT);
    console.log(`Server running on port ${PORT}`);
  }
}
