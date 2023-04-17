import { HttpException, HttpStatus } from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import * as path from 'path';
import { extname } from 'path';
import { v4 } from 'uuid';

const UPLOAD_LOCATION = path.join(__dirname, '..', '/uploads');

export const multerConfig = {
  dest: UPLOAD_LOCATION,
};

export const multerOptions = {
  fileFilter: (_: any, file: Express.Multer.File, cb: any) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
      cb(null, true);
    } else {
      cb(
        new HttpException(
          `Unsupported file type ${extname(file.originalname)}`,
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
    }
  },
  storage: diskStorage({
    destination: (_: any, file: any, cb: any) => {
      const uploadPath = multerConfig.dest;

      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
      }
      cb(null, uploadPath);
    },
    filename: (_: any, file: Express.Multer.File, cb: any) => {
      cb(null, `${v4()}${extname(file.originalname)}`);
    },
  }),
};
