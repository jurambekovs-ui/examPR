// src/infrastructure/upload/upload.service.ts
import { Injectable } from '@nestjs/common';
import { Express } from 'express';

@Injectable()
export class UploadService {
  async saveFile(file: Express.Multer.File) {
    return {
      message: 'File uploaded successfully!',
      filename: file.filename,
      path: `/uploads/images/${file.filename}`,
    };
  }
}
