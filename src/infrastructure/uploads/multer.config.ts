// src/infrastructure/upload/multer.config.ts
import { diskStorage } from 'multer';
import { extname, join } from 'path';

export const multerOptions = {
  storage: diskStorage({
    destination: join(__dirname, '../../../uploads/images'), // fayl saqlanadigan papka
    filename: (req, file, cb) => {
      const randomName = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, `${randomName}${extname(file.originalname)}`);
    },
  }),
  limits: {
    fileSize: 5 * 1024 * 1024, // max 5MB
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
      cb(new Error('Only image files are allowed!'), false);
    } else {
      cb(null, true);
    }
  },
};
