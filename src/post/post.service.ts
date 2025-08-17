import { Injectable, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreatePostDto } from './dto/create-post.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import multer from 'multer';

@Injectable()
export class PostService {
  constructor(private configService: ConfigService) {}

  create(body: CreatePostDto) {
    console.log('zz');
    console.log(body);
    return {};
  }

}
