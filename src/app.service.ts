import { NestFactory } from '@nestjs/core';
import { config } from './config';
import { AppModule } from './app.module';
import { HttpStatus, ValidationPipe } from '@nestjs/common';

export class App {
  static async main() {
    const app = await NestFactory.create(AppModule);
    const PORT = config.PORT;
    app.setGlobalPrefix('/api');
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    );
    app.listen(PORT, () => console.log('Server running on port', PORT));
  }
}
