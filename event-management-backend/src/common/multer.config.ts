import * as path from 'path';
const multer = require('multer');
// import multer from 'multer';

// Define the absolute path for the uploads directory
export const multerConfig = {
    storage: multer.diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        callback(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
      },
    }),
  };
