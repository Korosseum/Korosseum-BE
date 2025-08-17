import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { randomUUID } from "crypto";
import { existsSync, mkdirSync } from "fs";
import { diskStorage } from "multer";
import { extname, join } from "path";

export const multerConfig: MulterOptions = {
    storage: diskStorage({
      destination: (req, file, callback) => {
        // 업로드 폴더 구조 생성
        const uploadPath = join(process.cwd(), 'uploads', 'images');
        
        // 폴더가 없으면 생성
        if (!existsSync(uploadPath)) {
          mkdirSync(uploadPath, { recursive: true });
        }
        
        callback(null, uploadPath);
      },
      filename: (req, file, callback) => {
        // 파일명: UUID + 타임스탬프 + 확장자
        const uniqueName = `${randomUUID()}-${Date.now()}${extname(file.originalname)}`;
        callback(null, uniqueName);
      },
    }),
    fileFilter: (req, file, callback) => {
      // 이미지 파일만 허용
      const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      
      if (allowedMimes.includes(file.mimetype)) {
        callback(null, true);
      } else {
        callback(new Error('Only image files are allowed!'), false);
      }
    },
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB 제한
      files: 10, // 최대 10개 파일
    },
  };
  