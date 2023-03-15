import multer from 'multer';
import { Request } from 'express';

// File Configurations
export const storage = multer.diskStorage({
  destination: function (
    req: Request,
    file,
    cb: (error: Error, destination: string) => void,
  ) {
    cb(null, 'public/assets');
  },
  filename: function (
    req: Request,
    file,
    cb: (error: Error, destination: string) => void,
  ) {
    cb(null, file.originalname);
  },
});

export const upload: multer.Multer = multer({ storage });
